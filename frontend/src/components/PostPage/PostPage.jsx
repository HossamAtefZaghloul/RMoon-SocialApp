import { useState, useContext } from "react";
import Textarea from "@mui/joy/Textarea";
import { UserContext } from "../useContexts/UserProvider.jsx";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export default function PostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const { user } = useContext(UserContext);
  const userId = user.id;
  const timeAgo = new Date();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent further submissions if already submitting

    setIsSubmitting(true); // Set loading state to true
    const formData = new FormData();

    formData.append("content", content);
    formData.append("image", image);
    formData.append("userId", userId);
    formData.append("timeAgo", timeAgo);

    console.log("Submitting post:", { content, image, userId, timeAgo });
    try {
      const res = await axios.post(
        "http://localhost:5000/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data === "New post created") {
        window.location.reload();
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="bg-[#242526] w-[600px] flex flex-col items-center p-4 m-2 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4 text-white">Posts</h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full h-[150px]">
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-1 text-white"
          >
            Content
          </label>
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            color="danger"
            minRows={2}
            placeholder={`What is in your mind, ${user.username}?`}
            size="lg"
            variant="outlined"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="image"
            className="block text-sm font-medium mb-1 text-white"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border text-red-800 border-red-200 rounded"
          />
        </div>

        {imagePreview && (
          <div className="w-full my-4 flex justify-center ">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-[200px] rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full ${isSubmitting ? "bg-red-600" : "bg-red-700"} text-white p-2 rounded hover:bg-red-800`}
          disabled={isSubmitting} // Disable button if submitting
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
