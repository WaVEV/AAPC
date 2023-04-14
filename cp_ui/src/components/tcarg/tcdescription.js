import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Description = tw.div`mt-2 text-lg leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-gray-900 p-4 font-bold cursor-pointer transition duration-300 border border-transparent hover:border-green-500`;
const HeaderLink = tw.a`inline-block text-4xl sm:text-5xl text-blue-700 font-bold cursor-pointer transition duration-300 border border-transparent hover:border-blue-500`;

const tcIntroData = {
  ESP: {
    heading: "¿Qué es el Training Camp?",
    description: [
      <p key="paragraph 1"> Se trata de un entrenamiento intensivo de 2 semanas para competencias de programación con una parte teórica durante la mañana y sesiones de práctica durante la tarde. </p>,
      <p key="paragraph 2"> El Training Camp se organiza todos los años desde 2010 durante el receso invernal en distintas universidades de la Argentina. La edición 2023 será la decimocuarta edición se realizara en <a class="text-blue-400" target="blank" href="https://goo.gl/maps/ZLWnwnE4iZtwqAQQ9">La Matanza</a> </p>,
      <p key="paragraph 3"> El Training Camp dura dos semanas desde 31 de Julio al 11 de Agosto, de lunes a viernes, de 9 a 20hs. </p>
    ],
    faqText: "Ver preguntas frecuentes"
  },
  ENG: {
    heading: "What is the Training Camp?",
    description: [
      <p key="paragraph 1"> The Training Camp is an intensive training course of 2 weeks for programming contests with theoretical classes during the morning and practice sessions during the afternoon. </p>,
      <p key="paragraph 2"> The Training Camp has been organized every year since 2010 during the winter break in different universities in Argentina. The 2023 edition will be the thirfourth edition being hosted in <a class="text-blue-400" target="blank" href="https://goo.gl/maps/ZLWnwnE4iZtwqAQQ9">La Matanza</a></p>,
      <p key="paragraph 3"> The Training Camp lasts two weeks from July 31 to August 11, Monday through Friday, from 9 a.m. to 8 p.m. </p>
    ],
    faqText: "See more frequently asked questions"
  }
}

const TcDescription = (props) => {
  const presentation_header = props.language === "ENG" ? 'Training Camp Argentina 2023! Ask us anything at 16th of April 6:00 PM UTC-3 on' : '¡Training Camp Argentina 2023! Respondemos dudas el 16 de Abril las 18:00 hs en'
  const {heading, description, faqText} = tcIntroData[props.language]
  return (
    <Container>
      <SingleColumn>
          <HeadingInfoContainer>
            <HeadingTitle>{ presentation_header } <HeaderLink href="https://www.youtube.com/watch?v=YnBFkCoeLjo"> Youtube </HeaderLink> ! </HeadingTitle>
          </HeadingInfoContainer>
        </SingleColumn>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>{heading}</HeadingTitle>
        </HeadingInfoContainer>

        <Content>
            <Card>
              <Image imageSrc="/static/img_1.jpg" />
              <Details>
                <Description>
                {
                  description.map((elem, index) => elem)
                }
                </Description>
                <Link href={`${props.match.path}/faq`}>{faqText}</Link>
              </Details>
            </Card>
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
