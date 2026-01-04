import PropTypes from 'prop-types';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import { useEffect, useRef } from 'react';

const StoryEditor = ({ initialStory, onStoryChange, onEditorReady  }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      const storyEditor = new EditorJS({
        holder: 'editorjs-story',
         autofocus: true,
        inlineToolbar: true,

        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Title',
            },
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: 'Tell your story...',
            },
          },
        },
        data: {
          blocks: [
            {
              type: 'header',
              data: {
                text: initialStory.title || '',
              },
            },
            ...(initialStory.content
              ? initialStory.content.map((block) => ({ ...block }))
              : []),
          ],
        },
         onPaste: (event) => {
            console.log("Content Pasted")
  },
        onReady: () => {
          editorInstance.current = storyEditor;
          onEditorReady?.(storyEditor);
        },
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const handleBlur = async () => {
    if (editorInstance.current) {
      const savedData = await editorInstance.current.save();
      const newStoryData = {
        title: savedData.blocks[0]?.type === 'header' ? savedData.blocks[0].data.text : '',
        content: savedData.blocks.filter((block, index) => index !== 0 || block.type !== 'header'),
      };
      onStoryChange(newStoryData);
    }
  };

  useEffect(() => {
    if (editorInstance.current && initialStory) {
      const updateEditorContent = async () => {
        const savedData = await editorInstance.current.save();
        const newStoryData = {
          title: savedData.blocks[0]?.type === 'header' ? savedData.blocks[0].data.text : '',
          content: savedData.blocks.slice(1),
        };

        if (
          newStoryData.title !== initialStory.title ||
          JSON.stringify(newStoryData.content) !== JSON.stringify(initialStory.content)
        ) {
          const { title, content } = initialStory;

          const headerBlock = editorInstance.current.blocks.getBlockByIndex(0);
          if (headerBlock && headerBlock.type === 'header') {
            editorInstance.current.blocks.update(headerBlock.id, {
              type: 'header',
              data: { text: title || '' },
            });
          }

          if (content && content.length > 0) {
            content.forEach((newContentBlock, index) => {
              const block = editorInstance.current.blocks.getBlockByIndex(index + 1);
              if (block) {
                editorInstance.current.blocks.update(block.id, newContentBlock);
              }
            });
          }
        }
      };
      updateEditorContent();
    }
  }, [initialStory]);

  return (
    <div id="editorjs-story" className="story" onBlur={handleBlur}></div>
  );
};

StoryEditor.propTypes = {
  initialStory: PropTypes.object.isRequired,
  onStoryChange: PropTypes.func.isRequired,
  onEditorReady: PropTypes.func,
};

export default StoryEditor;
