import React from "react";
import { connect } from 'react-redux';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import { SectionHeading as Heading } from "components/misc/Headings.js";


// const HeadingRow = tw.div`flex`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
  strong {
    ${tw``}
  }
  a {
    ${tw`border-b-2 text-blue-500 border-transparent hocus:text-blue-500 hocus:border-blue-500 pb-1 transition duration-300`}
  }
`;



const GeneralInfo = (props) => {
  let text;

  if (props.language === 'ESP'){
    text = (
      <div>
        <Text>
            <p>
            El evento transcurrirá desde el 31 de Julio al 11 de Agosto (sin incluir sábado y domingo) y estará dividido en dos niveles:
            inicial y avanzado.
            </p>
            <p>
            Para quienes vienen del exterior recomendamos alojarse en la ciudad de Buenos Aires y no en La Matanza.
            </p>
            <p>
            <a href="/static/mapita_unlam.png" target="blank"> Mapa util de las instalaciones </a>
            </p>
          </Text>
          </div>)
  }else if(props.language === 'ENG'){
    text = (<Text>
            <p>The event is runing from July 31 to August 11 (not including Saturday and Sunday) and it's divided into two levels:
            initial and advanced.
            </p>
            <p>
            <a href="/static/mapita_unlam.png" target="blank"> Facility map </a>
            </p>
          </Text>)
  }

  return (
      <Container>
        <ContentWithPaddingLg>
          <Heading>Training Camp Argentina</Heading>
            {text}  
        </ContentWithPaddingLg>
      </Container>
  );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}

export default connect(mapStateToProps)(GeneralInfo);
