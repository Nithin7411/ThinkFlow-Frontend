const TagsContainer = ({ story }) => {
  const tags = Array.isArray(story?.tags)
    ? story.tags
    : typeof story?.tags === "string" && story.tags.trim()
    ? story.tags.split(",").map(t => t.trim())
    : [];

  if (!tags.length) return null;

  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsContainer;
