import React, { useEffect, useRef, useState } from "react";
import { Input, Modal } from "antd";
import { FormLabel, Box } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
import CategoryDropdown from "./Categorydropdown";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});



const UpdateBlogModel = ({ id,refreshBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('')
  const editor=useRef(null)
  
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

  const gettingdata=async()=>{
     setIsloading(true)
     try {
          const data=await axios.get(`/api/blogs/readOne/${id}`)
          const blog=data.data;
          if(blog?.success){
               setIsloading(false)
               setDescription(blog.blog.description)
               setTitle(blog.blog.title)
               setSelectedCategory(blog.blog.category)
               setImagePreview(blog.blog?.imageUrl)
          }
          
     } catch (error) {
          console.log(error)
          setIsModalOpen(false)
          toast.error('SomeThing wents Wrong')  
     }
  }
  const handleOk = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append('categoryId',selectedCategory)
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.put(`/api/blogs/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        refreshBlogs(); // Call refreshBlogs if necessary
        setIsModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog");
    } finally {
      setIsloading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if(isModalOpen){
     gettingdata()
    
    }
  }, [isModalOpen])
  return (
    <>
      <svg 
      onClick={showModal}
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256">
        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
      </svg>
      <Modal title="Update Blog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
               
                <div className="mb-4">
                <CategoryDropdown className="mt-5"
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                   />
                </div>
                <div className="mb-4"> 

                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                 <div className="flex items-center flex-row content-end">
                 <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md cursor-pointer "
                    required
                  />
                  <button>Remove image</button>
                 </div>
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

export default UpdateBlogModel;
