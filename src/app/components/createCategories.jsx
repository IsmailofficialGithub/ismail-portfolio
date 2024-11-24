import React, { useState,useRef } from "react";
import {  Modal,Input,Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import VirtualizedList from "./categoryList";


const CreateCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('')
  const [isloading, setIsloading] = useState(false);



  const handleSubmit =async()=>{
    setIsloading(true)
    try {
      const response = await axios.post('https://ismail-portfolio-sigma.vercel.app//api/category',{
        category:category,
      })
      const data=response.data;
      if(data.success){
       toast.success("SuccessFully Category is created")
       setCategory('')
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      
    }finally{
      setIsloading(false)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#243647] text-white text-sm font-medium leading-normal">
        <span className="truncate" onClick={showModal}>
          New Category
        </span>
      </button>
      <Modal title="Add New Categroy" open={isModalOpen} onCancel={handleCancel} onOk={handleCancel}>
        <div className="flex flex-row flex-wrap gap-1 ">
          <VirtualizedList />
          <div className="flex flex-col gap-3 ">
            <Input placeholder="Add blog" className="border-3 border-solid border-[#000000] border-2 rounded-lg px-3 py-3" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <Button onClick={handleSubmit} disabled={isloading? true:false}>Add Category</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategories;
