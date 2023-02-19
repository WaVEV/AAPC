import React from "react"
import "style.css"
// import "tailwindcss/dist/base.css"
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler"

import Hero from "components/hero/Hero.js";
import Footer from "components/footers/SimpleFiveColumn.js";

const ICPCArg = (props) => (
  <useAnimatedNavToggler>
    <Hero header="ICPC Argentina" />
    <Footer />
  </useAnimatedNavToggler>
);

export default ICPCArg;

