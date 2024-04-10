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
  ${tw`text-lg  text-gray-800 text-justify`}
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

  let text2 = (
    <Text>
      <p>
        <i>Nivel:</i> <b>Inicial y Avanzado</b>
      </p>
      <p>
        <i>Fecha:</i> <b>Lunes 08 al viernes 19 de Julio de 2024</b>
      </p>
      <p>
        <i>Lugar:</i> <b>Universidad Nacional de Rosario</b> -  Facultad de Ciencias Exactas, Ingeniería y Agrimensura
      </p>
      <p>
      <i>Dirección:</i> <a href="https://goo.su/MHJJa">Bv. Pellegrini 250, Rosario, provincia de Santa Fe. (ingreso por Bv. Pellegrini)</a>
      </p>
      <p>
      Inscripción: Gratuita, completando el Formulario de Inscripción TC 2024. Tiempo límite hasta el día 02 de junio (inclusive) - Siguiendo el órden de inscripción se dará prioridad a aquellas personas que acceden al uso de los laboratorios de la universidad.
      </p>
      <p>
      <i>Aclaración: Los costos de traslado y alojamiento corren por cuenta del participante.</i>
      </p>
      <p>
        <i>Dudas: <a href="mailto:contacto.trainingcamp.arg@gmail.com"></a>contacto.trainingcamp.arg@gmail.com</i>
      </p>
    </Text>
  )

  return (
      <Container>
        <ContentWithPaddingLg>
          <Heading>Training Camp Argentina</Heading>
            {text2}
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
