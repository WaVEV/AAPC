import React from "react"
import { connect } from 'react-redux';
import styled from "styled-components";
import {Route, Switch, Link} from 'react-router-dom'
import tw from "twin.macro";
import "style.css"
// import "tailwindcss/dist/base.css"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/Hero.js";
import News from "components/tcarg/News.js";
import TcDescription from "components/tcarg/tcdescription.js";
import Sponsors from "components/tcarg/Sponsors.js";
import Footer from "components/footers/SimpleFiveColumn.js";
import PreviousEditions from "components/tcarg/previous_editions/PreviousEditions.js"
import MoreInfo from "components/tcarg/more_info/MoreInfo.js"
import Faq from "components/tcarg/faq.js"


// Define buttonStyles as a string (using tw`` directly)
const buttonStyles = tw`
  px-8 py-3 cursor-pointer text-sm sm:mt-16 sm:px-8 sm:py-4 w-full
  bg-gray-100 font-black font-bold rounded shadow
  transition duration-300
  hocus:bg-gray-800 hocus:text-gray-100 focus:shadow-outline
`;

// Styled component for Link (PrimaryAction)
const PrimaryAction = styled(Link)`
  ${buttonStyles}
`;

// Styled component for anchor tag (InscriptionForm)
const InscriptionForm = styled.a`
  ${buttonStyles}
`;

const ButtonsContainer = tw.div`sm:inline-flex sm:space-x-12 mb-4 text-sm font-medium`;
const ButtonContainer = tw.div`first:mt-5 w-64 justify-center items-center first:sm:ml-0 first:sm:mt-0 inline-flex sm:space-x-12 mb-4 text-sm font-medium`;

const TcArgMain = (props) => {
    console.log(props.language);
    const inscriptionFormText = props.language === 'ESP' ? 'Formulario de Inscripción' : 'Registration Form';
    const moreInfo = props.language === 'ESP' ? 'Más Información' : 'More Info';
    const previousEditions = props.language === 'ESP' ? 'Ediciones Anteriores' : 'Previous Editions';
    const faqText= props.language === 'ESP' ? 'Preguntas frecuentes' : 'Frequently asked questions';
    return (
    <>
        <Hero header="Training Camp" backgroundImage="/static/hero_1.jpg">
            <ButtonsContainer>
                <ButtonContainer>
                    <InscriptionForm href="https://docs.google.com/forms/d/e/1FAIpQLSdLZTFTqlv4tptvv-tZQtWJkfWPlHRk6thsUQUUmtC8Hm4lDw/viewform" target="_black"> {inscriptionFormText} </InscriptionForm>
                </ButtonContainer>
                <ButtonContainer>
                    <PrimaryAction to={`${props.match.path}/more_info`}> {moreInfo} </PrimaryAction>
                </ButtonContainer>
                <ButtonContainer>
                    <PrimaryAction to={`${props.match.path}/previous_editions`}> {previousEditions} </PrimaryAction>
                </ButtonContainer>
                <ButtonContainer>
                    <PrimaryAction to={`${props.match.path}/faq`}> {faqText} </PrimaryAction>
                </ButtonContainer>
            </ButtonsContainer>
        </Hero>
        <TcDescription {...props}/>
        <News />
        <Sponsors />
    </>);
  }

const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}

const TcArgMainC = connect(mapStateToProps)(TcArgMain);

const TcArg = (props) => {
    return (
        <AnimationRevealPage disabled={true}>
        <Switch>
            <Route path={`${props.match.path}/previous_editions/:year?`} component={PreviousEditions} />
            <Route path={`${props.match.path}/more_info/`} component={MoreInfo} />
            <Route path={`${props.match.path}/faq/`} component={Faq} />
            <Route path={props.match.path} component={TcArgMainC} />
        </Switch>
        <Footer />
        </AnimationRevealPage>
    );
};

export default TcArg;

