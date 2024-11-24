"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from "../helper/moment";
import Navbar from "../components/Navbar";
import MultipleSelectChip from "../components/SelectFilter";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation'
import Footer from "../components/Footer";

const Page = () => {
  const router=useRouter()
  //  states
  const [blogs, setBlogs] = useState([]);
  const [skip, setSkip] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreBlogs, setNoMoreBlogs] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const defaultImage =
    "https://res.cloudinary.com/dzkoeyx3s/image/upload/v1731650154/scpvqn5bifrbb54n2axx.png";

  //Getting All categories
  const fetchCategory = async () => {
    try {
      const response = await axios.get("https://ismail-portfolio-sigma.vercel.app//api/category");
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong");
    }
  };

  // Getting Blogs based on filter || handle filter
  const fetchFilteredBlog = async () => {
    setSkip(0);
    setNoMoreBlogs(true);
    if (selectedCategoryIds.length > 0) { // if filter is selected
      setLoading(true);
      try {
        const response = await axios.post("https://ismail-portfolio-sigma.vercel.app//api/category/filter", {
          selectedCategoryIds,
        });
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setBlogs([]);
      setNoMoreBlogs(false);
      fetchBlogs();// fetch default blog fetching function
    }
  };


  //Getting blogs 
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const limit = skip === 0 ? 6 : 3;
      const response = await axios.get(`/api/blogs/readAll?skip=${skip}`);
      if (response.data.blogs && response.data.blogs.length > 0) {
        setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
        setSkip((prevSkip) => prevSkip + response.data.blogs.length);
      } else {
        setNoMoreBlogs(true);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  // First render fuction calling
  useEffect(() => {
    fetchBlogs();
    fetchCategory();
  }, []);

  // fuction calling based to filter 
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const delayFetch = setTimeout(() => {
      fetchFilteredBlog();
    }, 1500);
    return () => clearTimeout(delayFetch);
  }, [selectedCategoryIds]);

  return (
    <>
      <Navbar />
      <div>
        <title>Ismail.Blogs</title>
        <div
          className="relative flex size-full min-h-screen flex-col bg-[#121212] group/design-root overflow-x-hidden text-white"
          style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}>
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 flex flex-1 justify-center py-2  sm:mb-32 mb-5">
              <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mt-20">
                {loading ? <Loader /> : ""}
                <MultipleSelectChip
                  categories={categories}
                  selectedCategoryIds={selectedCategoryIds}
                  setSelectedCategoryIds={setSelectedCategoryIds}
                />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3 p-4">
                  {blogs.map((blog) => (
                    <div className="flex flex-col gap-3 pb-3 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300" onClick={()=>{router.push(`https://ismail-portfolio-sigma.vercel.app//blogs/${blog._id}`)}}>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl object-cover "
                        style={{
                          backgroundImage: `url("${blog.imageUrl ? blog.imageUrl : defaultImage}")`,
                        }}
                      />
                      <div>
                        <p className="text-[#f5faff] text-base font-medium leading-normal">
                          {blog.title}...
                        </p>
                        <p className="text-[#4e7397] text-sm font-normal leading-normal">
                          By Ismail Abbasi . Posted: <TimeAgo createdAt={blog.createdAt} />
                        </p>
                        <p>
                          {new Date(blog.createdAt).toLocaleDateString()} |{" "}
                          {new Date(blog.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {noMoreBlogs ? (
                  <h1 className="font-bold text-center my-2">No Blog found</h1>
                ) : (
                  <button className="bg-[#a855f7] hover:bg-[#9244db] text-white font-medium py-2.5 px-5 rounded-lg w-auto" onClick={fetchBlogs}>Load More</button>
                )}
              </div>
            </div>
          </div>
      <Footer/>
        </div>
      </div>
    </>
  );
};

export default Page;
