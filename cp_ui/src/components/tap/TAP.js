import React from "react"
import "style.css"
// import "tailwindcss/dist/base.css"
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler"

import Hero from "./Hero.js";
import Footer from "components/footers/SimpleFiveColumn.js";

const TAP = (props) => (
  <useAnimatedNavToggler>
    <Hero />
    <Footer />
  </useAnimatedNavToggler>
);

export default TAP;

