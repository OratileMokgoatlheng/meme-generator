import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";


function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
    randomName: "",
  });
  
  const [allMemes, setAllMemes] = React.useState([])

  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  })
  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    const name = allMemes[randomNumber].name;
    setMeme((prevState) => {
      return { ...prevState, randomImage: url, randomName: name };
    });
  };


  // const handleTopTextChange = (event) => {
  //   const topText = event.target.value;
  //   //console.log(topText)
  //   setMeme((prevState) => {
  //     return { ...prevState, topText: topText };
  //   });
  // };

  // const handleBottomTextChange = (event) => {
  //   const bottomText = event.target.value;
  //   //console.log(bottomText)
  //   setMeme((prevState) => {
  //     return { ...prevState, bottomText: bottomText };
  //   });
  // };
function handleChange(event){
  const {value, name} = event.target
  setMeme(prevMeme => {
    return{
      ...prevMeme,
      [name]: value
    }
  })
}

  return (
    <div className="form--submit">
      <Input
        placeholder="top text here..."
        type="text"
        className="input--text"
        value={meme.topText}
        name="topText"
        onChange={handleChange}
      />
      <Input
        placeholder="bottom text here..."
        type="text"
        className="input--text"
        value={meme.bottomText}
        name="bottomText"
        onChange={handleChange}
      />
      <Button
        className="submit--button"
        variant="contained"
        onClick={getMemeImage}
      >
        Get a new meme image 🦘
      </Button>
      <div className="meme--container">
        <div className="meme--text top">{meme.topText}</div>
        <img src={meme.randomImage} className="meme--image" alt="Meme" />
        <div className="meme--text bottom">{meme.bottomText}</div>
      </div>
      <Button variant="contained">{meme.randomName}</Button>
    </div>
  );
}

export default Meme;
