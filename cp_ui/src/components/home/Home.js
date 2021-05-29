import React from "react"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/Hero.js";
import Footer from "components/footers/SimpleFiveColumn.js";


export default () => (
  <AnimationRevealPage disabled={true}>
    <Hero header="Asociación Argentina Programación Competitiva">  </Hero>
    <Footer />
  </AnimationRevealPage>
);