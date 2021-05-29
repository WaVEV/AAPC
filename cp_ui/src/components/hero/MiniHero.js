import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Navbar from "components/navbar/Navbar"

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-1 min-h-144`}
  background-image: url(${props => props.backgroundImage});
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-black font-bold rounded shadow transition duration-300 hocus:bg-gray-800 hocus:text-gray-100 focus:shadow-outline`;


const Hero = (props) => {
  const {header, children, backgroundImage} = props;
  return (
    <Container backgroundImage={backgroundImage}>
      <OpacityOverlay />
      <HeroContainer>
        <Navbar />
        <Content>
          <Heading>
              {header}
          </Heading>
          {children && children}
        </Content>
      </HeroContainer>
    </Container>
  );
};


export default Hero;