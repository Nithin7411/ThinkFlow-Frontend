import { useState } from "react";
import { uploadCoverImage } from "../script/uploadCoverImage";

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    try {
      setLoading(true);
      setError("");

      const url = await uploadCoverImage(file);
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cloudinary Upload Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <>
          <p>Returned URL:</p>
          <a href={imageUrl} target="_blank">{imageUrl}</a>
          <br /><br />
          <img src={imageUrl} width="300" />
        </>
      )}
    </div>
  );
};

export default TestUpload;
