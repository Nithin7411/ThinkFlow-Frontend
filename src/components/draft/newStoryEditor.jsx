import { useEffect, useState } from 'react';
import StoryEditor from './storyEditor';
import { useLocation } from 'react-router-dom';
import Header from '../Navbar/Navbar';

const NewStoryEditor = () => {
  const location = useLocation();
  const draftData = location.state?.draft;
  const [storyId, setStoryId] = useState(draftData ? draftData.id : null);
  const [editorData, setEditorData] = useState(draftData ? { title: draftData.title, content: draftData.content } : { title: '', content: [] });
  const [saveMessage, setSaveMessage] = useState('');
  const [storytags, setTags] = useState([]);

  const saveData = async () => {
    const dataToSend = {
      storyId,
      title: editorData.title,
      content: editorData.content,
    };
    try {
      const response = await fetch(`http://localhost:8000/story`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const result = await response.json();
        setSaveMessage(result.status);
        setStoryId(result.storyId);
      } else {
        const error = await response.json();
        setSaveMessage(`Error: ${error.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setSaveMessage(`Network error: ${error.message}`);
    }
  };

  useEffect(() => {
    if (editorData.title || editorData.content.length > 0) {
      saveData();
    }
  }, [editorData.title, editorData.content]);

  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => setSaveMessage(''), 1500);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  const publishStory = async (storyId, tags) => {
  setTags(tags); // keep local state in sync (optional but good)
  const dataToSend = {
    tags,
  };

  try {
    const response = await fetch(
      `http://localhost:8000/story/${storyId}/publish`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );

    if (response.ok) {
      const result = await response.json();
      setSaveMessage("Story published successfully!");
    } else {
      const error = await response.json();
      setSaveMessage(`Error: ${error.error || "Unknown error occurred"}`);
    }
  } catch (error) {
    setSaveMessage(`Network error: ${error.message}`);
  }
};

  return (
    <>
      <Header onClick={publishStory} data={editorData} storyId={storyId} setTags={setTags} />
      {saveMessage && <div className='save-message'>Draft saved</div>}
      <div className='story-editor'>
        <StoryEditor
          initialStory={editorData}
          onStoryChange={(newStoryData) => setEditorData(newStoryData)}
        />
      </div>
    </>
  );
};

export default NewStoryEditor;
