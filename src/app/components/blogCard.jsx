import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import TimeAgo from '../helper/moment';

export default function BlogCard({imageUrl,title,description,createdAt}) {
  const DefaultImage="https://res.cloudinary.com/dzkoeyx3s/image/upload/v1731650154/scpvqn5bifrbb54n2axx.png"
   
  return (
    <Card sx={{ maxWidth: 345 }} className='rounded-lg'>
      <CardActionArea>
        <CardMedia
        className='h-64'
          component="img"
          image={imageUrl ? imageUrl :DefaultImage}
          alt="green iguana"
        />
        <CardContent className='bg-[#222121] text-white'>
          <Typography gutterBottom variant="h5"className='h-20 overflow-hidden' component="div">
           {title}
          </Typography>
          <Typography variant="body2" className='h-5 overflow-hidden mb-16' sx={{ color: 'white' }}>
          {description}
          </Typography>
          <Typography variant="body2" className='h-4 overflow-hidden' sx={{ color: 'white' }}>
          <TimeAgo createdAt={createdAt} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}