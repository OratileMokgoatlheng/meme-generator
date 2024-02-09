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
const ProjectName = styled.h1`
  margin-top: 10px;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Text shadow for contrast */
`;

const ProjectDescription = styled.p`
  margin-top: 5px;
  font-size: 1.2rem;
  color: #f1f1f1; /* Light text color */
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
