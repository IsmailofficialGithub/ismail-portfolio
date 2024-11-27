"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import axios from "axios";
import Link from "next/link";
import { MoveUpRight } from 'lucide-react';

const Blogsection = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(false);
  

  const fetchingBlogs = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/blogs/readless");
      if (response.data.success) {
        setBlogs(response.data.blogs);
        setloading(false);
      } else {
        console.log(response.data);
        setloading(true);
      }
    } catch (error) {
      console.log(error);
      setloading(true);
    }
  };

  useEffect(() => {
    fetchingBlogs();
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <section class="mt-24">
          <h2 class="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">My Blogs</h2>
          <div class="flex justify-center">
            <ul class="flex border-x overflow-x-auto space-x-4 w-full max-w-screen-lg px-4 scrollbar scrollbar-thumb-gray-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#121212] [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
             {
              blogs.map(blog=>(
                <li class="flex-shrink-0 w-1/3 min-w-[300px]" key={blog._id}>
               <Link href={`/blogs/${blog._id}`}>
               <BlogCard
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog?.imageUrl}
                  createdAt={blog?.createdAt}
                />
               </Link>
              </li>
              ))
             }
             <li className="text-white flex items-center "><Link href="/blogs"><MoveUpRight className="text-[#ffffff] hover:text-[#363232]" width={50} height={50} stroke-width={5} cursor='pointer'/></Link></li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Blogsection;
