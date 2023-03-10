import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db, auth } from './firebase';


function Post({postId,username,caption,imageUrl}) {
  const [comments, setComments] = useState([]);
const [comment, setComment] = useState([]);
useEffect(() => {
  let unsubscribe;
  if (postId) {
      unsubscribe = db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
          })
  }

  return () => {
      unsubscribe();
  };
}, [postId]);
  return (
    <div className='post'>
        <div className="post__header">
        <Avatar
        className="post__avatar"
        alt=''
        src=""
        />
        <h3>{username}</h3>
        </div>
        <img className='post__image'src={imageUrl}alt=""></img>
        <h4 className='post__text'><strong>{username}  </strong> {caption}</h4>
    </div>
  )
}

export default Post