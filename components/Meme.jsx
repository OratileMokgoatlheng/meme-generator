import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import styled from "styled-components";

const StyledMemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledMemeText = styled.div`
  font-size: ${(props) => props.fontSize || "24px"};
  color: ${(props) => props.color || "white"};
  text-shadow: 2px 2px 2px black;
`;

const StyledMemeImage = styled.img`
  width: 100%;
  max-width: 600px;
  border: 2px solid black;
  margin: 20px 0;
`;
// New styled component for text input
const StyledTextInput = styled(Input)`
  margin-bottom: 10px;
`;

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
    randomName: "",
  });

  const [allMemes, setAllMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meme data:", error);
        setError("Failed to fetch meme data");
        setLoading(false);
      });
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    const name = allMemes[randomNumber].name;
    setMeme((prevState) => {
      return { ...prevState, randomImage: url, randomName: name };
    });
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";

      // Top text
      ctx.fillText(meme.topText, canvas.width / 2, 40);

      // Bottom text
      ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "meme.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = meme.randomImage;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  };

  return (
    <StyledMemeContainer>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Input
            placeholder="Top text here..."
            type="text"
            className="input--text"
            value={meme.topText}
            name="topText"
            onChange={handleChange}
          />
          <Input
            placeholder="Bottom text here..."
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
          <StyledMemeContainer>
            <StyledMemeText fontSize="32px" color="white">
              {meme.topText}
            </StyledMemeText>
            <StyledMemeImage src={meme.randomImage} alt="Meme" />
            <StyledMemeText fontSize="32px" color="white">
              {meme.bottomText}
            </StyledMemeText>
          </StyledMemeContainer>
          <Button variant="contained" onClick={handleDownload}>
            Download Meme
          </Button>
        </>
      )}
    </StyledMemeContainer>
  );
}

export default Meme;
