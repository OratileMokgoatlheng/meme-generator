import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #282c34; /* Add your preferred background color */
  padding: 20px;
`;

const HeaderImage = styled.img`
  width: 100px; /* Adjust the width as needed */
  height: 100px; /* Adjust the height as needed */
`;

const ProjectName = styled.h3`
  margin-top: 10px; /* Adjust the margin as needed */
  font-size: 1.5rem; /* Adjust the font size as needed */
  color: white; /* Add your preferred text color */
`;

const ProjectDescription = styled.p`
  margin-top: 5px; /* Adjust the margin as needed */
  font-size: 1rem; /* Adjust the font size as needed */
  color: lightgray; /* Add your preferred text color */
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderImage src="./images/troll-face.png" alt="Troll Face" className="header--image" />
      <ProjectName>Meme Generator</ProjectName>
      <ProjectDescription>React Course - Project 3</ProjectDescription>
    </HeaderContainer>
  );
}

export default Header;
