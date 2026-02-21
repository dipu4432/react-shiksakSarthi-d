
// Utility to upload image to backend, which uploads to Cloudinary
// Usage: await uploadToCloudinary(file)
export const uploadToCloudinary = async (file) => {
  const url = import.meta.env.VITE_API_URL + "/api/upload";
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.url;
};
