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
      <section className="mt-24">
  <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">My Blogs</h2>
  <div className="flex justify-center">
    <ul className="flex border-x overflow-x-auto space-x-4 w-full max-w-screen-lg px-4 scrollbar scrollbar-thumb-gray-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#121212] [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
      {'{'}
      blogs.map(blog=&gt;(
      <li className="flex-shrink-0 w-1/3 min-w-[300px]" key="{blog._id}">
        <link href="{`/blogs/${blog._id}`}" />
        <blogcard title="{blog.title}" description="{blog.description}" imageurl="{blog?.imageUrl}" createdat="{blog?.createdAt}">
        </blogcard></li>
      ))
      {'}'}
      <li className="text-white flex items-center "><link href="/blogs" /><moveupright className="text-[#ffffff] hover:text-[#363232]" width="{50}" height="{50}" strokeWidth="{5}" cursor="pointer" /></li>
    </ul>
  </div>
</section>

      )}
    </>
  );
};

export default Blogsection;
