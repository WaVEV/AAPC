import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;

const Content = tw.div`mt-16 `;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);

const ImageContainer = styled.div`
  ${tw`md:w-1/2`}
`;

const Image = styled.img`
  ${tw`w-full h-auto`}
`;

const TextContainer = styled.div`
  ${tw`md:w-1/2 p-4 tracking-wide`}
`;

const Title = styled.h2`
  ${tw`text-3xl font-bold mb-4`}
`;

const ParagraphContainer = styled.div`
  ${tw`text-lg`}
  > p + p {
    ${tw`mt-4`}
  }
`;

const LinkText = tw.a`text-blue-400 ml-1 cursor-pointer border border-transparent border-b-blue-500`;

const tcIntroData = {
  ESP: {
    heading: "Programación Competitiva",
    description: [
      <p key="paragraph 1"> La programación competitiva es una disciplina en la que se resuelven problemas complejos de lógica y matemáticas utilizando una computadora. Estos desafíos son similares a los que se encuentran en las Olimpíadas de Matemáticas y otras competencias académicas. </p>,
      <p key="paragraph 2">
        Este evento se lleva a cabo anualmente desde 2010, aprovechando el receso invernal, en diferentes universidades de Argentina. La edición de 2024 será la decimoquinta y se llevará a cabo en 
          <LinkText className="text-blue-400" target="blank" href="https://goo.su/MHJJa">Universidad Nacional de Rosario</LinkText> </p>,
    ],
    faqText: "Ver preguntas frecuentes",
    imageSrc: "/static/img_1.jpg"
  },
  ENG: {
    heading: "What is the Training Camp?",
    description: [
      <p key="paragraph 1"> The Training Camp is an intensive training course of 2 weeks for programming contests with theoretical classes during the morning and practice sessions during the afternoon. </p>,
      <p key="paragraph 2"> The Training Camp has been organized every year since 2010 during the winter break in different universities in Argentina. The 2023 edition will be the thirfourth edition being hosted in
        <LinkText className="text-blue-400" target="blank" href="https://goo.su/MHJJa">Universidad Nacional de Rosario</LinkText> </p>,
      <p key="paragraph 3"> The Training Camp lasts two weeks from July 31 to August 11, Monday through Friday, from 9 a.m. to 7 p.m. </p>
    ],
    faqText: "See more frequently asked questions",
    imageSrc: "/static/img_1.jpg"
  }
}


const tcMoreData = [
  {
    ESP:{
      heading: "Lo que debes saber",
      description: [
        <p key="paragraph 1"> El Training Camp tiene una duración de dos semanas, del 8 de Julio al 19 de Julio. Las actividades se realizan de lunes a viernes, de 9:00 a.m. a 7:00 p.m. </p>,
        <p key="paragraph 2"> Para participar en nuestro programa, es necesario tener conocimientos básicos en uno de los siguientes lenguajes de programación: C/C++, Python o Java. </p>,
        <p key="paragraph 3">
          Si lo deseas, puedes unirte a nuestros grupos:
            <LinkText href="https://groups.google.com/g/training-camp-argentina-2024" target="_blank" >Google</LinkText> y
            <LinkText href="https://t.me/+Gu92SJ3ZxixkMDNh" target="_blank" >Telegram</LinkText>
        </p>,
      ],
      imageSrc: "/static/img_7.jpg",
    },
    ENG:{
      heading: "Lo que Debes Saber",
      description: [
        <p key="paragraph 1"> El Training Camp tiene una duración de dos semanas, del 8 de Julio al 19 de Julio. Las actividades se realizan de lunes a viernes, de 9:00 a.m. a 7:00 p.m. </p>,
        <p key="paragraph 2"> Para participar en nuestro programa, es necesario tener conocimientos básicos en uno de los siguientes lenguajes de programación: C/C++, Python o Java. </p>,
        <p key="paragraph 3">
          Si lo deseas, puedes unirte a nuestros grupos:
            <LinkText href="https://groups.google.com/g/training-camp-argentina-2024" target="_blank" >Google </LinkText> y
            <LinkText href="https://t.me/+Gu92SJ3ZxixkMDNh" target="_blank" > Telegram </LinkText>
        </p>,
      ],
      imageSrc: "/static/img_7.jpg",
    }
  }
]


const TcDescription = (props) => {
  const {heading, description, faqText, imageSrc} = tcIntroData[props.language]
  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>¡Únete al entrenamiento en Programación Competitiva más prestigioso de Argentina!</HeadingTitle>
        </HeadingInfoContainer>

        <Content>
          <Card reversed={true}>
            
              <TextContainer>
                <Title>{heading}</Title>
                <ParagraphContainer>
                <>
                  {
                    description.map((elem, index) => elem)
                  }
                  <p key="paragraph 3">
                    {props.language === "ENG" ? "Any doubts?" : "Dudas?"}
                    <LinkText href={`${props.match.path}/faq`}>{faqText}</LinkText>
                  </p>
                </>
                </ParagraphContainer>
              </TextContainer>
              <ImageContainer>
                <Image src={imageSrc} />
              </ImageContainer>
            
          </Card>
            {
              tcMoreData.map((elem, index) => {
                const {heading, description, imageSrc} = elem[props.language]
                return (
                  <Card reversed={index % 2 === 1} key={index}>
                    <TextContainer>
                        <Title>{heading}</Title>
                        <ParagraphContainer>
                          {
                            description.map((elem, index) => elem)
                          }
                        </ParagraphContainer>
                      </TextContainer>
                      <ImageContainer>
                        <Image src={imageSrc} />
                      </ImageContainer>
                  </Card>
                )
              })
            }
        </Content>
      </SingleColumn>
    </Container>
  );
};



const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}

export default connect(mapStateToProps)(TcDescription);
