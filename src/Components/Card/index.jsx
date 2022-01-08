import React, { useState } from "react";
import { HeartIcon, ChatAltIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

const comments = [
  { username: "chefcurry", comment: "Perfect pic, nice one 🔥🔥" },
  { username: "thehoneyqueen", comment: "nice" },
  { username: "johnlenny", comment: "Meh I can take better pictures" },
  { username: "summertimejoe", comment: "Incredible!!" },
  { username: "kevinyarn", comment: "we need to check this out @linuxarmy" },
  { username: "jsonmaxie", comment: "I need this on my wall" },
  { username: "linuxarmy", comment: "@kevinyarn you gotta see this 👀" },
  { username: "javaexpress", comment: "So awesome" },
];
const comment1 = comments.pop(Math.floor(Math.random() * comments.length));
const comment2 = comments.pop(Math.floor(Math.random() * comments.length));

export default function Card(props) {
  const [isLiked, setIsLiked] = useState(props.isSavedPost);

  function handleLike() {
    setIsLiked(!isLiked);
    props.handleSavePost();
  }
  
  return (
    <div className="max-w-md sm:mx-auto rounded overflow-hidden shadow-lg mx-5 mb-8 bg-white">
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src={props.avatar} alt="profilepic" />
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">{props.username}</span>
        </div>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
        </span>
      </div>
      <img className="w-full bg-cover" src={props.post} alt={props.title}/>
      <div className="px-3 pb-2">
        <div className="pt-2">
          <button onClick={() => handleLike()}>
            <svg
              className="w-5 h-5 mr-2 text-gray-600 inline-block cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {isLiked ? (
                <HeartIconFilled className="text-red-500" />
              ) : (
                <HeartIcon />
              )}
            </svg>
          </button>
          <svg
            className="w-5 h-5 mr-2 text-gray-600 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <ChatAltIcon />
          </svg>
          <span className="text-sm text-gray-400 font-medium block">
            {isLiked ? Number(props.numOfLikes) + 1 : props.numOfLikes} likes
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm whitespace-pre-line">
            <span className="font-medium mr-2">{props.username}</span>
            {props.caption}
          </div>
        </div>
        <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
          View all 14 comments
        </div>
        <div className="mb-2">
          {props.comments ? (
            props.comments.map((comment) => (
              <div className="mb-1 text-sm">
                <span className="font-medium mr-2">{comment.username}</span>{" "}
                {comment.comment}
              </div>
            ))
          ) : (
            <>
              <div className="mb-1 text-sm">
                <span className="font-medium mr-2">{comment1.username}</span> {comment1.comment}
              </div>
              <div className="mb-1 text-sm">
                <span className="font-medium mr-2">{comment2.username}</span> {comment2.comment}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
