"use client";
import React, { useState, useEffect } from "react";
import AddBlogModel from "@/app/components/addBlogModel";
import UpdateBlogModel from "@/app/components/updateBlogModel";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import { Button } from "@mui/material";
import CreateCategories from "@/app/components/createCategories";
import Navbar from "@/app/components/Navbar";
const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [noMoreBlogs, setNoMoreBlogs] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const gettingBlog = async () => {
    setIsloading(true);
    try {
      const limit = skip === 0 ? 6 : 3;
      const response = await axios.get(`/api/blogs/readAll?skip=${skip}`);
      if (response?.data?.blogs?.length > 0) {
        setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
        setSkip((prevSkip) => prevSkip + response.data.blogs.length);
      } else {
        setNoMoreBlogs(true);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs.");
    } finally {
      setIsloading(false);
    }
  };

const handleDelete = async (id) => {
  const originalBlogs = [...blogs]; // Backup original list
  const newBlogList = blogs.filter((item) => item._id !== id);
  setBlogs(newBlogList);

  try {
      const deleted = await axios.delete(`/api/blogs/delete/${id}`);
      if (deleted?.data?.success) {
          toast.success(deleted.data.message);
      } else {
          throw new Error(deleted?.data?.message || "Unknown error");
      }
  } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Restoring the original list.");
      setBlogs(originalBlogs); // Restore original list
  }
};

  const refreshBlogs = () => {
    gettingBlog();
  };
  useEffect(() => {
    gettingBlog();
  }, []);
  return (
    <div>
      <Toaster />
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
      <link
        rel="stylesheet"
        as="style"
        onload="this.rel='stylesheet'"
        href="https://fonts.googleapis.com/css2?display=swap&family=Newsreader%3Awght%40400%3B500%3B700%3B800&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
      />
      <title>Admin dashboard blogs </title>
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
      <div
        className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar/>
          <div className="sm:px-28 md:px-2 lg:px-1 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mt-16 sm:mt-20">
              <div className="flex flex-wrap gap-2 p-4">
                <a className="text-[#93adc8] text-base font-medium leading-normal" href="#">
                  Blogs
                </a>
                <span className="text-[#93adc8] text-base font-medium leading-normal">/</span>
                <span className="text-white text-base font-medium leading-normal">
                  All Blogs : {blogs.length}
                </span>
              </div>
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                  All Blogs
                </p>
              <div className="flex flex-row gap-2 flex-wrap">
              <CreateCategories/>
              <AddBlogModel refreshBlogs={refreshBlogs} />
              </div>
              </div>
                <>
                {isloading ? <Loader/>:''}
                  {blogs.map((data, index) => (
                 
                 
                      <div
                      key={data._id || index}
                      className="flex items-center gap-4 bg-[#111a22] hover:bg-[#101820] px-4 min-h-[72px] py-2 justify-between cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14" />
                        <div className="flex flex-col justify-center">
                          <p className="text-white text-base font-medium leading-normal line-clamp-1">
                            {data.title}
                          </p>
                          <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                            {new Date(data.createdAt).toLocaleDateString()} at{" "}
                            {new Date(data.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div
                          className="text-white flex size-7 items-center justify-center gap-3 cursor-pointer"
                          data-icon="PencilSimple"
                          data-size="24px"
                          data-weight="regular">
                          <UpdateBlogModel id={data._id} refreshBlogs={refreshBlogs} />
                          <Image
                            src="/images/deleteIcon.svg"
                            alt="Delete image"
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(data._id);
                            }}
                            width={24} // Desired width of the image
                            height={24}
                          />
                        </div>
                      </div>
                    </div>
                  
                  ))}
                </>
             
              {!noMoreBlogs && (
               <div className="flex justify-center items-center">
                     <Button onClick={gettingBlog} disabled={isloading} className="py-2 px-3 bg-white hover:bg-slate-500 text-warmGray-700 w-1/4 ">
                  {isloading ? "Loading..." : "Load More"}
                </Button>
               </div>
              )}
              {noMoreBlogs && <h1 className="text-white text-center text-2xl mb-3">No more blogs available</h1>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
