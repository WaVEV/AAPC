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
    ${tw`border-b-2 text-blue-800 border-transparent hocus:text-blue-500 hocus:border-blue-500 pb-1 transition duration-300`}
  }
`;

const GeneralInfo = (props) => {
  let text;
  if (props.language === 'ESP'){
    text = (<Text>
            <p>
            El evento transcurrirá desde el 31 de Julio al 11 de Agosto (sin incluir sábado y domingo) y estará dividido en dos niveles:
            inicial y avanzado. <br/>Las actividades por nivel serán confirmadas en los proximos dias.
            </p>
            <p>
            Para quienes vienen del exterior recomendamos alojarse en la ciudad de Buenos Aires y no en La Matanza. <br />
            Más adelante agregaremos más información con recomendaciones de viaje y acceso a la universidad
              <h3> Cronograma tentativo </h3>
            </p>
            <ul>
              <li> <strong> De 9:00 a 13:00 hs (UTC-3):</strong> resolución de problemas de competencias de días previos y clases teóricas en donde se explicarán algoritmos, técnicas, estructuras y trucos útiles para las competencias de programación. </li>
              <li> <strong> De 14:00 a 19:00 hs (UTC-3): </strong> Se realizará una competencia para cada nivel, al estilo ICPC, cada día con duración de 5 horas.  </li>
            </ul>
          </Text>)
  }else if(props.language === 'ENG'){
    text = (<Text>
            <p>The event is runing from July 31 to August 11 (not including Saturday and Sunday) and it's divided into two levels:
            initial and advanced. <br/> The activities by level will be defined within a few days.
            </p>
            <p>
            For those who come from abroad, we recommend staying in the city of Buenos Aires and not in La Matanza.
            Later we will add more information with travel recommendations and access to the university
             <h3> Tentative schedule</h3>
            </p>
            <ul>
            <li> <strong> From 9:00 to 13:00 hs (UTC-3):</strong> Resolution of competition problems from previous days and Theoretical classes where algorithms, techniques, structures and useful tricks for programming skills will be explained.</li>
            <li> <strong> From 14:00 to 19:00 hs (UTC-3): </strong> There will be a competition for each level, ICPC style, each day lasting 5 hours. </li>
            </ul>
          </Text>)
  }

  return (
      <Container>
        <ContentWithPaddingLg>
          <Heading>Training Camp Argentina - Virtual</Heading>
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
