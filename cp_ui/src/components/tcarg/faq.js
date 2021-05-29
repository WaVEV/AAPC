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
        question: "¿Qué es una competencia de programación?",
        answer:
          "Se trata de competencias en las que hay que resolver problemas individualmente o en equipo, utilizando razonamientos de lógica y matemática, como así también algorítmicos. Luego, la solución debe ser implementada mediante un lenguaje de programación, y se evalúa dicha solución contra un conjunto de casos de prueba que juzgan automáticamente (y muchas veces en vivo) si esta es correcta o no."
      },
      {
        question: "¿Qué tipo de problemas se pueden encontrar en una competencia de programación?",
        answer:
          "Las competencias cuentan con problemas de diversos estilos: estructuras de datos, teoría de juegos, algoritmos greedy, programación dinámica, fuerza bruta, aritmética, geometría computacional, etc. Se pueden ver en la página del Torneo Argentino de Programación los problemas de años anteriores."
      },
      {
        question: "¿Para qué sirve participar del Training Camp?",
        answer:
          "Un Training Camp prepara a los estudiantes para participar de competencias de programación. La más importante de ellas, la ICPC, es para la cual apuntamos a preparar a los participantes. Además, al aprender a resolver problemas algorítmicos, lógicos y matemáticos los participantes quedan también muy bien preparados para enfrentar entrevistas en las principales empresas de la industria, muchas de las cuales son o han sido sponsors del Training Camp."
      },
      {
        question: "¿El entrenamiento recibido en el Training Camp sirve para cualquier competencia de programación?",
        answer:
          "Si, aunque el entrenamiento se enfoca en la preparación para la competencia Regional de la ICPC y en el caso de los participantes argentinos también para el Torneo Argentino de Programación. En ambas competencias, varios equipos de 3 integrantes, compiten en distintas sedes del país (o del continente) en simultaneo, tratando de resolver un conjunto de entre 8 y 13 problemas, utilizando una única computadora por equipo y en un plazo de 5 horas. Cada vez que resuelven un problema, suben el código fuente a un sitio web, que les informa si su programa resuelve de forma correcta el problema."
      },
      {
        question: "¿Qué lenguajes utilizaremos en el Training Camp?",
        answer:
          "Utilizaremos C, C++, Java o Python, ya que estos son los lenguajes permitidos en las competencias ACM-ICPC."
      },
      {
        question: "¿Y qué mas?",
        answer:
          "Además de las charlas técnicas, y sesiones de práctica, el Training Camp contará con momentos de distensión y recreación, y algún bloque para que los sponsors hagan una presentación."
      },
      {
        question: "Recién comienzo la carrera y no tengo muchos conocimientos… ¿Puedo asistir? ¿Me sirve el entrenamiento?",
        answer:
          "¡Por supuesto que sí! No va a ser fácil, pero esto es un desafío. Mientras antes comiencen a practicar, mejor. El nivel de los participantes en los Training Camp suele ser muy variado, y los instructores están capacitados para que todos aprendan."
      },
      {
        question: "¿Me gano algo por participar de un Training Camp o de un torneo de programación?",
        answer:
          "Sí, van a aprender muchas cosas nuevas, en muchos casos diferentes de las que suelen estudiar en sus respectivas carreras. Además, aquellos con buen desempeño durante los torneos de programación tendrán la posibilidad de viajar a las respectivas finales regionales o mundiales. Además, el entrenamiento puede ser útil para la mayoría de las competencias de programación más reconocidas: Google Code Jam, Facebook Hacker Cup, CodeForces, TopCoder, Codility, Codechef, SPOJ, URI OJ, HackerRank.\
          Dependiendo de la edición (ya que la sede, los auspiciantes, y demás cuestiones organizativas varían cada año) podría haber diversos premios para los mejores equipos al finalizar el Training Camp."
      },
    ]
  },
  ENG: {
    heading: "Frequently Asked Questions",
    faqs: [
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
                  {faq.answer}
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