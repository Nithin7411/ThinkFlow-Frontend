export const uploadCoverImage = async (file) => {
  if (!file) throw new Error("No file selected");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/upload-cover`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Image upload failed");
  }

  return data.url;
};
