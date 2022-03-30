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
            
            <p>El evento transcurrirá desde el 18 al 29 julio (sin incluir sábado y domingo) y estará dividido en dos niveles: 
            inicial y avanzado. Las actividades por nivel serán las siguientes:</p>

            <h3 > Turno mañana: </h3>
              <ul>
                <li> <strong> De 10:00 a 11:30 hs (UTC-3):</strong> resolución de problemas de competencias de días previos. El primer día realizaremos una bienvenida e introducción al evento en este horario. </li>
                <li> <strong> De 11:30 a 13:00 hs (UTC-3): </strong> clases teóricas en donde se explicarán algoritmos, técnicas, estructuras y trucos útiles para las competencias de programación. </li>
                <li> Las clases serán por streaming con interacción por chat y se transmitirán por <a href='https://www.youtube.com/channel/UCTtoEdiHyjP6XmxMGhsngCA' target="_blank"> este canal de Youtube </a> . </li>
              </ul>

            <h3 > Turno tarde </h3>
            <p> Se realizará una competencia para cada nivel, al estilo ICPC, cada día con duración de 5 horas. La misma será desde las 15:00 hasta las 20:00 hs (UTC-3). Se va a utilizar <a href="https://www.codeforces.com" target="_blank"> Codeforces </a> para hostear los contests. Estos se encontrarán en un grupo creado para el evento, al cual es obligatorio unirse <a href="https://codeforces.com/group/j1UosVRZar" > Grupo Codeforces </a>. </p>
            <p> La participación en las competencias puede realizarse de manera individual, o en equipos de a lo sumo 3 personas (siendo esto último lo que se recomienda). Para quienes quieran participar en equipos, deben crear previamente un team en la página de Codeforces. </p>

          </Text>)
  }else if(props.language === 'ENG'){
    text = (<Text>
            <p>The event will run from July 18 to 29 (not including Saturday and Sunday) and will be divided into two levels:
            initial and advanced. The activities by level will be the following:</p>
            <h3 > Morning shift: </h3>
              <ul>
                <li> <strong> From 10:00 to 11:30 hs (UTC-3):</strong> resolution of competition problems from previous days. On the first day we will have a welcome and introduction to the event at this time.</li>
                <li> <strong> From 11:30 to 13:00 hs (UTC-3): </strong> Theoretical classes where algorithms, techniques, structures and useful tricks for programming skills will be explained. </li>
                <li> The classes will be by streaming with chat interaction, and it will be transmitted on <a href='https://www.youtube.com/channel/UCTtoEdiHyjP6XmxMGhsngCA' target="_blank"> this Youtube Channel </a> . </li>
              </ul>

            <h3 > Afternoon shift </h3>
            <p> There will be a competition for each level, ICPC style, each day lasting 5 hours. It will be from 3:00 p.m. to 8:00 p.m. (UTC-3). <a href="https://www.codeforces.com" target="_blank"> Codeforces </a> will be used to host the contests. These will be found in a group created for the event, which is mandatory to join <a href="https://codeforces.com/group/j1UosVRZar" > Codeforces Group </a>. </p>
            <p> Participation in competitions could be individually or in teams of at most three people (the latter being what it's recommended). For those participants who wants to participate in teams, they must previously create a team on the Codeforces page. </p>
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
