"use client";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import Navbar from "@/app/components/Navbar";
import TimeAgo from "@/app/helper/moment";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaTwitter, FaInstagram,FaCopy } from "react-icons/fa";


const ArticleCard = () => {
  const params = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loading,setLoading]=useState(false)
  const pageUrl = window.location.href; 
  const pageTitle=blogData?.title

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
  };
  const copyToClipboard=()=>{
    let origin=window.location.origin
    let pathname=window.location.pathname
    const url = `${origin}/${pathname}`
    navigator.clipboard.writeText(url);
    toast.success('Url is copied')
  }

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      pageUrl
    )}&text=${encodeURIComponent(pageTitle)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareOnInstagram = () => {
    alert("Instagram does not support direct URL sharing. Share this link manually!");
  };

  const fetchingData = async () => {
      setLoading(true)
    try {
      const response = await axios.get(`/api/blogs/readOne/${params.id}`);
      if (response.data.success) {
        setBlogData(response.data.blog);
        const description = document.getElementById("description");
        description.innerHTML = response.data.blog.description;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
    <Navbar />
    <div className="bg-[#121212] min-h-screen text-white">
      {/* Social Media Icons */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Article Header */}
        {loading? <Loader className="mt-12"/>:
        <header className="text-center sm:mt-20 md:mt-28 mt-16 lg:mt-28 ">
            
          <h1 className="text-3xl font-bold mb-6">{blogData?.title}</h1>
          <hr className="mb-4"/>
          <p className="text-[#4e7397] text-sm font-normal leading-normal">
           Written By Ismail Abbasi.
          </p>
          <p className="text-[#fdfdfd] text-xs">
    
            {new Date(blogData.createdAt).toLocaleDateString()} |{" "}
            {new Date(blogData.createdAt).toLocaleTimeString()}
            <br />
            <TimeAgo createdAt={blogData.createdAt} />
          </p>
          <div className="flex justify-end space-x-4 p-4 text-gray-400">
        <button
          onClick={shareOnFacebook}
          aria-label="Share on Facebook"
          className="hover:text-white"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={shareOnTwitter}
          aria-label="Share on Twitter"
          className="hover:text-white"
        >
          <FaTwitter />
        </button>
        <button
          onClick={shareOnInstagram}
          aria-label="Share on Instagram"
          className="hover:text-white"
        >
          <FaInstagram />
        </button>
        <button
          onClick={copyToClipboard}
          aria-label="Copy url"
          className="hover:text-white"
        >
          <FaCopy />
        </button>
      </div>
        </header>
}

        {/* Article Body */}
        <div className="mt-6 text-lg " id="description"></div>
      </div>
    </div>
   <div className="bg-[#121212] text-white ">
   <Footer />
   </div>
    </>
    
  );
};

export default ArticleCard;
