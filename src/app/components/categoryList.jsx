import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import axios from 'axios';
import {  RefreshCcw } from 'lucide-react';

function RenderRow({ index, style, data }) {
  return (
    <ListItem style={style} key={data[index]._id} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={data[index].category} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const [categories, setCategories] = useState([]);
  const [isloading, setIsloading] = useState(false)
  


  const fetchCategories = async () => {
    setIsloading(true)
    try {
      const response = await axios.get(' /api/category');
      const data = response.data;
      if (data.categories) {
        setCategories(data.categories);
      } else {
        console.warn("No 'categories' field found in API response");
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }finally{
      setIsloading(false)
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        width: '50%',
        height: '60%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
     <div className='flex flex-row justify-around cursor-pointer'>
     <h3>All Categories</h3>
      <RefreshCcw className={`w-4 h-4 ${isloading ? 'animate-spin':''}` }  onClick={fetchCategories}/>
     </div>
      {categories.length > 0 ? (
        <FixedSizeList
          height={200}
          width={200}
          itemSize={46}
          itemCount={categories.length}
          itemData={categories} // Pass categories data to the row renderer
          overscanCount={5}
        >
          {({ index, style, data }) => (
            <RenderRow index={index} style={style} data={data} />
          )}
        </FixedSizeList>
      ) : (
       ''
      )}
    </Box>
  );
}
