import { useState, useEffect } from "react";
import { uploadCoverImage } from "../script/uploadCoverImage";
import "./tagsPopup.css";

const TagsPopUp = ({ handlePublish, toggleTagsPopup, setTags }) => {
  const [tagValue, setTagValue] = useState("");
  const [localTags, setLocalTags] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [confirmNoCover, setConfirmNoCover] = useState(false);

  const addTag = () => {
    const value = tagValue.trim().toLowerCase();
    if (!value || localTags.includes(value)) return;

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

  const handleImageUpload = async () => {
    if (!coverFile) return;

    if (coverFile.size > 9 * 1024 * 1024) {
      alert("Cover image must be under 2MB");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadCoverImage(coverFile);
      setCoverUrl(url);
      setConfirmNoCover(false);
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFinalPublish = (forceWithoutCover = false) => {
    setConfirmNoCover(false);

    handlePublish({
      tags: localTags,
      coverImageUrl: forceWithoutCover ? null : coverUrl || null,
    });
  };

  const handleClose = () => {
    setTagValue("");
    setLocalTags([]);
    setCoverFile(null);
    setCoverUrl("");
    setConfirmNoCover(false);
    toggleTagsPopup();
  };

  return (
    <div className="backgroundBlur">
      <div className="tagsPopup">

        <div className="popupHeader">
          <h2>Add tags & cover</h2>
          <span
            className="helpIcon"
            onClick={() => setShowHelp(prev => !prev)}
          >
            ?
          </span>
        </div>

        {showHelp && (
          <p className="helpText">
            Tags help readers discover your story.
            A cover image improves visibility, but it’s optional.
          </p>
        )}

        <div className="coverUpload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />

          <button
            onClick={handleImageUpload}
            disabled={!coverFile || uploading}
          >
            {uploading ? "Uploading..." : "Upload Cover"}
          </button>

          {coverUrl && (
            <img
              src={coverUrl}
              alt="Cover preview"
              className="coverPreview"
            />
          )}
        </div>

        <div className="addTagsFeature">
          <input
            type="text"
            placeholder="Type a tag and press Enter"
            maxLength={30}
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addTag} className="addTags">
            Add
          </button>
        </div>

        {localTags.length > 0 && (
          <div className="tagsList">
            {localTags.map(tag => (
              <span key={tag} className="tagChip">
                #{tag}
                <button onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
        )}

        {confirmNoCover && !coverUrl && (
          <div className="confirmBox">
            <p>Publish without a cover image?</p>
            <div className="confirmActions">
              <button onClick={() => setConfirmNoCover(false)}>
                Add cover
              </button>
              <button
                className="danger"
                onClick={() => handleFinalPublish(true)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="popupOptions">
          <button
            className="publishTags"
            disabled={localTags.length === 0 || uploading}
            onClick={() => {
              if (!coverUrl && !confirmNoCover) {
                setConfirmNoCover(true);
                return;
              }
              handleFinalPublish();
            }}
          >
            Publish
          </button>

          <button onClick={handleClose} className="closeTags">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default TagsPopUp;
