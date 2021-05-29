import React, { useState } from "react";
import tw from "twin.macro";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { NavLinks, NavToggle, DesktopNavLinks } from "../headers/light.js";
import logo from "../../images/AAPC.png";
import DropDown from "./NavDropDown.js";

const NavLink = styled(Link)`${tw`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500`}`

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks}, ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-gray-500`}
  }
`;

const NavBar = () => {
  const links = [
    {
      ref: '/',
      name: 'Home'
    },
    /*{
      ref: '/icpc-arg',
      name: 'ICPC Arg'
    },
    {
      ref: '/tap',
      name: 'TAP'
    }*/,
    {
      ref: '/tc-arg',
      name: 'Training Camp'
    }
  ]

  const AppLogo = (
    <LogoLink to="/">
      <img src={logo} alt="logo" />
      AAPC
    </LogoLink>
  );

  const navLinks = (
    <NavLinks>
      {links.map((link, i) => <NavLink key={i} to={link.ref}>  {link.name} </NavLink> ) }
      <DropDown />
    </NavLinks>)

  return <StyledHeader links={navLinks} logoLink={AppLogo} />;
};

export default NavBar;
