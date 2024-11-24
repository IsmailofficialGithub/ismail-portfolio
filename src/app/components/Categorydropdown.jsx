import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CategoryDropdown({selectedCategory, setSelectedCategory }) {
     const [categories, setCategories] = useState([]);
     const [isLoading, setIsLoading] = useState(true); // Add a loading state
   
     const gettingCategories = async () => {
       try {
         const response = await axios.get('http://localhost:3000/api/category');
         const data = response.data;
         if (data) {
           setCategories(data.categories);
         }
       } catch (error) {
         console.error('Error fetching categories:', error);
       } finally {
         setIsLoading(false); // Data loading complete
       }
     };
   
     useEffect(() => {
       gettingCategories();
     }, []);
   
     if (isLoading) {
       return <div>Loading...</div>; // Avoid rendering until data is loaded
     }
   
     return (
       <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
           <InputLabel id="category-select-label">Category</InputLabel>
           <Select
             labelId="category-select-label"
             id="category-select"
             value={selectedCategory}
             label="Category"
             onChange={(e) => setSelectedCategory(e.target.value)}
           >
             {categories.map((item) => (
               <MenuItem key={item._id} value={item._id}>
                 {item.category}
               </MenuItem>
             ))}
           </Select>
         </FormControl>
         
       </Box>
     );
   }
   