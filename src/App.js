import { useEffect, useState } from "react";
import Card from "./Components/Card";
import LikedPostsModal from "./Components/LikedPostsModal";

import { default as Avatar } from "./Components/Assets/avatar.png";
import { default as Post } from "./Components/Assets/post.jpg";

const API_KEY = "Z5BdQe6xe3pDMJeZHWcnmB9IBKJAKR9MLuIUpiJd";
const myProfile = {
  username: "anthonyreyesf",
  caption: `Hey there, I'm Anthony Reyes and I'm currently a student @YorkU!${"\n\n"}I previously worked at @Ada, @D2L and @Mixemapp as a Software Developer Intern and I hope to be able to do my last internship at @Shopify!`,
  numOfLikes: "2022",
  avatar: Avatar,
  post: Post,
  comments: [
    { username: "champagnepapi", comment: "Keep it up 🔥🔥🔥" },
    { username: "nasa", comment: "To the moooon 🧑‍🚀🚀" },
  ],
};

function App() {
  const [nasaData, setNasaData] = useState(null);
  const [pagination, setPagination] = useState(0);
  const [showModal, setShowmodal] = useState(false);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?count=6&api_key=${API_KEY}`)
      .then((results) => results.json())
      .then((data) => {
        setNasaData(data);
      });
  }, [pagination]);

  function savePost(post) {
    localStorage.setItem(post.title, JSON.stringify(post));
    setShowmodal(false);
  }

  return (
    <div className="bg-gray-100 py-8 relative">
      <Card
        avatar={myProfile.avatar}
        post={myProfile.post}
        username={myProfile.username}
        numOfLikes={"2022"}
        caption={myProfile.caption}
        comments={myProfile.comments}
        isSavedPost={false}
      />
      {nasaData ? (
        nasaData.map(apod => (
          <Card
            key={apod.title}
            avatar={apod.url}
            post={apod.hdurl}
            username={apod.title}
            numOfLikes={Math.floor(Math.random() * 100000) + 1000}
            caption={apod.explanation}
            handleSavePost={() => savePost(apod)}
            isSavedPost={false}
          />
        ))
      ) : (
        <div className="max-w-md sm:mx-auto rounded overflow-hidden shadow-lg mx-5 mb-8 bg-white">
          <div className="w-64 h-44 bg-gray-200 animate-pulse"></div>
          <div className="mt-8 h-32 w-full space-y-3">
            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      <div className="max-w-md sm:mx-auto text-center">
      <button onClick={() => setShowmodal(!showModal)} className="bg-blue-500 mx-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Saved Posts
      </button>
      <button onClick={() => setPagination(pagination + 1)} className="bg-blue-500 mx-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
      </div>
      {showModal && (
        <LikedPostsModal closeModal={() => setShowmodal(false)}/>
      )}
    </div>
  );
}

export default App;
