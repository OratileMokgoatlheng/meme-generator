import React, { useEffect, useState } from "react";
import { Button, Input, Select, MenuItem } from "@mui/material";
import styled from "styled-components";

// Styled components for the meme generator
const StyledMemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledMemeText = styled.div`
  font-size: ${(props) => props.fontSize || "24px"};
  color: ${(props) => props.color || "white"};
  font-weight: ${(props) => props.bold ? "bold" : "normal"};
  font-style: ${(props) => props.italic ? "italic" : "normal"};
  text-decoration: ${(props) => props.underline ? "underline" : "none"};
  text-shadow: 2px 2px 2px black;
`;

const StyledMemeImage = styled.img`
  width: 100%;
  max-width: 600px;
  border: 2px solid black;
  margin: 20px 0;
  border-radius: 10px;
`;

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

  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [background, setBackground] = useState({
    color: "#ffffff",
    image: "",
  });

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

      // Draw background
      ctx.fillStyle = background.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw top text
      ctx.font = `bold ${textStyle.bold ? '30' : '24'}px Arial`;
      ctx.fillStyle = textStyle.color || "white";
      ctx.textAlign = "center";
      ctx.fillText(meme.topText, canvas.width / 2, 40);

      // Draw bottom text
      ctx.font = `bold ${textStyle.bold ? '30' : '24'}px Arial`;
      ctx.fillStyle = textStyle.color || "white";
      ctx.textAlign = "center";
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

  const handleChangeTextStyle = (style) => {
    setTextStyle((prevTextStyle) => ({
      ...prevTextStyle,
      [style]: !prevTextStyle[style],
    }));
  };

  const handleChangeBackground = (event) => {
    setBackground((prevBackground) => ({
      ...prevBackground,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <StyledMemeContainer>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Top Text Input with Styling Options */}
          <StyledTextInput
            placeholder="Top text here..."
            type="text"
            value={meme.topText}
            name="topText"
            onChange={handleChange}
          />
          <div>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("bold")}
            >
              Bold
            </Button>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("italic")}
            >
              Italic
            </Button>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("underline")}
            >
              Underline
            </Button>
          </div>

          {/* Bottom Text Input with Styling Options */}
          <StyledTextInput
            placeholder="Bottom text here..."
            type="text"
            value={meme.bottomText}
            name="bottomText"
            onChange={handleChange}
          />
          <div>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("bold")}
            >
              Bold
            </Button>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("italic")}
            >
              Italic
            </Button>
            <Button
              variant="contained"
              onClick={() => handleChangeTextStyle("underline")}
            >
              Underline
            </Button>
          </div>

          {/* Background Color and Image Options */}
          <div>
            <Input
              type="color"
              value={background.color}
              name="color"
              onChange={handleChangeBackground}
            />
            <Select
              value={background.image}
              name="image"
              onChange={handleChangeBackground}
            >
              <MenuItem value="">No Background Image</MenuItem>
              {/* Add additional background images as needed */}
            </Select>
          </div>

          {/* Get Meme Image Button */}
          <Button
            variant="contained"
            onClick={getMemeImage}
          >
            Get a new meme image 🦘
          </Button>

          {/* Display Meme */}
          <StyledMemeContainer>
            <StyledMemeText fontSize={textStyle.bold ? "32px" : "24px"} color={textStyle.color}>
              {meme.topText}
            </StyledMemeText>
            <StyledMemeImage src={meme.randomImage} alt="Meme" />
            <StyledMemeText fontSize={textStyle.bold ? "32px" : "24px"} color={textStyle.color}>
              {meme.bottomText}
            </StyledMemeText>
          </StyledMemeContainer>

          {/* Download Meme Button */}
          <Button variant="contained" onClick={handleDownload}>
            Download Meme
          </Button>
        </>
      )}
    </StyledMemeContainer>
  );
}

export default Meme;
