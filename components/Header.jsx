import styled from "styled-components";

// Styled components for the header
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #2980b9, #2c3e50); /* Gradient background */
  padding: 20px;
  text-align: center;
`;

const HeaderImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 50%; /* Circular image */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
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
