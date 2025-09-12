"use client"
import React, { useEffect, useState ,useRef} from "react";
import { Input, Modal } from "antd";
import { FormLabel } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
import CategoryDropdown from "./Categorydropdown";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});


const AddBlogModel = ({ refreshBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Wellcome");
  const editor=useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (title.length <= 3) {
      return toast.error("Please Add title atleast one word");
    } else if (description.length < 50) {
      return toast.error("Description must be more than 50 letters ");
    }
    setIsloading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("categoryId", selectedCategory);
    try {
      const response = await axios.post("/api/blogs/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      const data = response.data;
      
      if (data.success) {
        toast.success(data?.message)
        await refreshBlogs()
        setTitle('')
        setSelectedCategory('')
        setDescription('')
        setImageFile(null)
        setImagePreview(null)
        setIsModalOpen(false)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
     
    } finally {
      setIsloading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#243647] text-white text-sm font-medium leading-normal">
        <span className="truncate" onClick={showModal}>
          New Blog
        </span>
      </button>
      <Modal title="Add New Blog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <>
          {isloading ? (
            <Loader size={60} color="#ff6347" />
          ) : (
            <>
              <FormLabel>
                Title
                <Input
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required="true"
                  value={title}
                />
              </FormLabel>
                <FormLabel>
                Description {description.length}/ 500{" "}
               <JoditEditor
                ref={editor}
                value={description}
                onChange={newContent=>{setDescription(newContent)}}
               />
                </FormLabel>
                  <CategoryDropdown className="mt-8"
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                   />
                <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {imagePreview && (
            
      <div className="flex justify-center items-center">
          <img
                src={imagePreview}
                alt="Selected Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "300px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
      </div>           
            

          )}
             
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default AddBlogModel;
