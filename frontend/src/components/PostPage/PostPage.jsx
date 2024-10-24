import { useState, useContext } from "react";
import Textarea from "@mui/joy/Textarea";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../useContexts/UserProvider.jsx";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export default function PostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const timeAgo = new Date();
  const storedData = localStorage.getItem("token");
  const token = storedData; // next taaaaaaaaaaaaaaaaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imagePreviewUrl);
      return () => {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
      };
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (res.data === "newPost") {
        window.location.reload();
      } else console.log("fail");
    } catch (e) {
      console.log(e);
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
            onChange={(e) => {
              setContent(e.target.value);
              // console.log(content);
            }}
            color="danger"
            minRows={2}
            placeholder="What is in your mind Hos."
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
          className="w-full bg-red-700 text-white p-2 rounded hover:bg-red-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
