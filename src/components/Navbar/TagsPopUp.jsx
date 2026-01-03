import { useState } from "react";

const TagsPopUp = ({ handlePublish, toggleTagsPopup, setTags }) => {
  const [tagValue, setTagValue] = useState("");
  const [localTags, setLocalTags] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const addTag = () => {
    const value = tagValue.trim().toLowerCase();
    if (!value) return;
    if (localTags.includes(value)) return;

    const updated = [...localTags, value];
    setLocalTags(updated);
    setTags(updated); 
    setTagValue("");
  };

  const removeTag = (tag) => {
    const updated = localTags.filter(t => t !== tag);
    setLocalTags(updated);
    setTags(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="backgroundBlur">
      <div className="tagsPopup">

        {/* Title */}
        <div className="popupHeader">
          <h2>Add tags</h2>
          <span
            className="helpIcon"
            onClick={() => setShowHelp(!showHelp)}
          >
            ?
          </span>
        </div>

        {/* Help text */}
        {showHelp && (
          <p className="helpText">
            Tags help readers find your story.
            Choose words that describe the main topic.
            Example: <b>javascript</b>, <b>learning</b>, <b>web</b>
          </p>
        )}

        {/* Input */}
        <div className="addTagsFeature">
          <input
            type="text"
            placeholder="Type a tag and press Enter"
            maxLength={30}
            value={tagValue}
            onChange={e => setTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addTag} className="addTags">
            Add
          </button>
        </div>

        {/* Added tags */}
        {localTags.length > 0 && (
          <div className="tagsList">
            {localTags.map(tag => (
              <span key={tag} className="tagChip">
                #{tag}
                <button
                  className="removeTag"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="popupOptions">
          <button
            onClick={() => handlePublish(localTags)}
            className="publishTags"
            disabled={localTags.length === 0}
          >
            Publish
          </button>
          <button onClick={toggleTagsPopup} className="closeTags">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default TagsPopUp;
