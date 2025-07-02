import React, { useState } from "react";
import { connect } from 'react-redux';
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import Hero from "components/hero/MiniHero.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const faqsData = {
  ESP: {
    heading: "Preguntas Frecuentes",
    faqs: [
      {
        question: "¿Dónde alojarme?",
        answer:
          `La FCEIA-UNR está ubicada en una zona céntrica de la ciudad de Rosario que cuenta con distintos tipos de alojamientos. Su dirección es Av. Pellegrini 250. Por ello, recomendamos alojarse en la zona conformada entre Bv. Pellegrini y Arturo Illia, y Bv. Francia y Av. Belgrano.
          Aquí se pueden consultar hostels - https://groups.google.com/g/training-camp-argentina-2024/c/FIqhVo-nnYY`
      },
      {
        question: "¿Y qué más?",
        answer:
          "Por fuera de las charlas técnicas y sesiones de práctica, habrá bloques para que los sponsors puedan hacer presentaciones y compartir experiencias. Además ¡habrán momentos de distensión y recreación durante el Training Camp!. El día 09 de julio es Feriado Nacional en conmemoración del Día de la Independencia Argentina. Durante ese día se realizarán actividades recreativas y turísticas planificadas para el contingente de estudiantes que desee conocer un poco más de la historia y la cultura de la ciudad de Rosario."
      },
      {
        question: "¿Puedo participar virtualmente?",
        answer: "El Training Camp es un evento pensado para ser presencial. Pero haremos nuestro mejor esfuerzo para los que no hayan podido llegar a asistir puedan acceder a los contenidos. El formulario es SÓLAMENTE para los asistentes presenciales. Si querés acceder al material de forma virtual te recomendamos subscribirte a la lista de correo y telegram donde iremos enviando las actualizaciones, links de interés, etc."
      },
    ]
  },
  ENG: {
    heading: "Frequently Asked Questions",
    faqs: [
      {
        question: "How to get there and where to stay?",
        answer:
          "For those who come from abroad, we recommend staying in the city of Buenos Aires and not in La Matanza. Later we will add more information with travel recommendations and access to the university."
      },
      {
        question: "What is a programming contest?",
        answer:
          "A programming contest consist of several problems to solve, individually or as part of a team, using logic, math and algorithmic and reasoning skills. The solution to each problem must be implemented in a programming language and is judged by comparing it with the judges solution on several test cases to check whether it is correct or not."
      },
      {
        question: "What kind of problems are there in programming contest?",
        answer:
          "Contests have problems spanning a wide variety of topics: data structures, game theory, greedy algorithms, dynamic programming, brute force, arithmetic, computational geometry, etc."
      },
      {
        question: "What do I gain from participating in a Training Camp?",
        answer:
          "A Training Camp prepares the students to participate in programming contests. The most important of them, the ACM ICPC, is our main goal when we prepare the students of a Training Camp. Besides that, by learning to solve algorithmical, logical and mathematical problems, the contestants are very well prepared to face interviews at the top software companies in the industry, many of which are or have been sponsors of the Training Camp."
      },
      {
        question: "Is my preparation at the Training Camp useful for any programming contest?",
        answer:
          "Yes, even though the training is very focused on the ACM ICPC Regional Contest, it prepares the students for any kind of programming contest."
      },
      {
        question: "What languages can we use on a Training Camp?",
        answer:
          "We use C, C++, Java or Python, since those are the languages available at ICPC."
      },
      {
        question: "What else?",
        answer:
          "Besides the technical aspects, the Training Camp will have moments of recreation, and some time for the sponsors to give a presentation to all the participants."
      }
    ]
  }
}

const Faq = (props) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  const {heading, faqs} = faqsData[props.language];

  return (
    <Container>
      <Hero header={heading} backgroundImage="/static/hero_1.jpg"/>
      <ContentWithPaddingXl>
        <Column>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                  { faq.answer }
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
    </Container>
  );
}


const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}

export default connect(mapStateToProps)(Faq);