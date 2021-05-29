import React, { useState } from "react";
import { connect } from 'react-redux';
import tw from "twin.macro";
import styled from "styled-components";
import changeLanguage from 'redux/actions/changeLanguage.js'

import { NavLink } from "../headers/light.js";

const DropDownOptionsContainer = tw.div`origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1`;
const DropDownOption = tw.button`text-gray-700 block w-full text-left px-2 py-2 text-sm hover:border-gray-600 border-2`;
const DropDownButton = styled(NavLink)`${tw`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-gray-100 hocus:text-gray-100 cursor-pointer relative`}`;

const DropDown = (props) => {
  const [active, setActive] = useState(null);

  const toggleOptions = () => {
    setActive(!active);
  };

  return (
    <DropDownButton onClick={toggleOptions} > 
      {props.language === 'ESP' ? 'Idioma' : 'Language'}
      {active ? ( <DropDownOptionsContainer>
        <DropDownOption onClick={() => {toggleOptions(); props.changeLanguage('ESP')}}> Español </DropDownOption>
        <DropDownOption onClick={() => {toggleOptions(); props.changeLanguage('ENG')}}> English </DropDownOption>
      </DropDownOptionsContainer> ) : ''}
    </DropDownButton>
  );
}


const mapStateToProps = (state) => {
    return {
        language: state.language,
    };
}


const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: (language) => {
      dispatch(changeLanguage(language));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
