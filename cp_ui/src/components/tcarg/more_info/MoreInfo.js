import React from "react"
import { connect } from 'react-redux';
import tw from "twin.macro";
import "style.css"
//import "tailwindcss/dist/base.css"

import Hero from "components/hero/MiniHero.js";
import Speakers from 'components/tcarg/more_info/Speakers.js';
import GeneralInfo from 'components/tcarg/more_info/GeneralInfo.js';
import ContentTable from 'components/tcarg/more_info/ContentTable.js';
import ContestTable from 'components/tcarg/more_info/ContestTable.js';
import ScheduleInfo from 'components/tcarg/more_info/Schedule.jsx';

const PrimaryAction = tw.a`px-8 py-3 cursor-pointer text-sm sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-black font-bold rounded shadow transition duration-300 hocus:bg-gray-800 hocus:text-gray-100 focus:shadow-outline`;

const MoreInfo = (props) => {
  const heading = props.language === 'ESP' ? 'Información sobre el Training Camp' : 'Information About Training Camp';
  const inscriptionFormText = props.language === 'ESP' ? 'Formulario de Inscripción' : 'Registration Form';
  return (
    <>
    <Hero header={heading} backgroundImage="/static/hero_1.jpg" >
      <PrimaryAction href="https://forms.gle/CAp76txX7HsHtupN8" target="_black"> {inscriptionFormText} </PrimaryAction>
    </Hero>
    <GeneralInfo />
    <ScheduleInfo />
    <Speakers />
    <ContentTable />
    <ContestTable />
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}

export default connect(mapStateToProps)(MoreInfo);
