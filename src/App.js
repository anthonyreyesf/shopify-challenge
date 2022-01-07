import { useEffect, useState } from "react";
import Card from "./Components/Card";

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

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?count=6&api_key=${API_KEY}`)
      .then((results) => results.json())
      .then((data) => {
        setNasaData(data);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <Card
        avatar={myProfile.avatar}
        post={myProfile.post}
        username={myProfile.username}
        numOfLikes={"2022"}
        caption={myProfile.caption}
        comments={myProfile.comments}
      />
      {nasaData && (
        nasaData.map(apod => (
          <Card
            key={apod.title}
            avatar={apod.url}
            post={apod.hdurl}
            username={apod.title}
            numOfLikes={Math.floor(Math.random() * 100000) + 1000}
            caption={apod.explanation}
          />
        ))
      )}
    </div>
  );
}
//key={apod.title} source={apod.hdurl} title={apod.title} content={apod.explanation} date={apod.date}
export default App;
