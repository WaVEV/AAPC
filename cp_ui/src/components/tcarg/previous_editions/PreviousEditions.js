import React from "react"
import { connect } from 'react-redux';
import tw from "twin.macro";
import "style.css"
//import "tailwindcss/dist/base.css"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/MiniHero.js";
import Sponsors from "./Sponsors.js";
import ContentTable from "./ContentTable.js";
import ContestTable from "./ContestTable.js";
import Speakers from './Speakers.js'
import selectEdition from 'redux/actions/selectEdition'

const PrimaryAction = tw.a`px-8 py-3 cursor-pointer text-sm sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-black font-bold rounded shadow transition duration-300 hocus:bg-gray-800 hocus:text-gray-100 focus:shadow-outline`;
const ButtonsContainer = tw.div`flex space-x-12 mb-4 text-sm font-medium`;
const YearSelector = tw.select`px-8 py-1 cursor-pointer text-sm sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-black font-bold shadow transition duration-300`
const YearOption = tw.option`px-8 py-3 bg-gray-100`

const PreviousEditions = (props) => {
  const onChange = (event) => {
    props.selectEdition(parseInt(event.target.value));
  }
  return (
    <>
    <Hero header="Ediciones Anteriores de Training Camp" backgroundImage="/static/hero_1.jpg">
        <ButtonsContainer>
          <YearSelector onChange={onChange}>
            {
              props.editions.editions.map((edition, index) => <YearOption value={edition.id} key={index}> {edition.year} </YearOption>)
            }
          </YearSelector>
        </ButtonsContainer>
    </Hero>
    <Sponsors />
    <Speakers />
    <ContentTable />
    <ContestTable />
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        editions: state.editions,
        language: state.language,
    };
}

const mapDispatchToProps = dispatch => {
  return {
    selectEdition: (editionId) => {
      dispatch(selectEdition(editionId));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PreviousEditions);
