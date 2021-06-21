import React from "react";
import { connect } from 'react-redux';
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading } from "components/misc/Headings.js";

const SponsorsSeparator = tw.div`mt-8`;
const Subheading = tw.h5`font-bold text-3xl text-yellow-900 text-center mb-4`;
const SponsorRow = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch justify-center`;
const SponsorCard = tw.div`mt-16 lg:w-1/3 m-auto`;
const SponsorBox = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const ImageContainer = tw.div`px-4 max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img``;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;


class Sponsors extends React.Component{
  state = {
    sponsors: []
  }

  componentDidMount() {
    this.__fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.componentNeedsUpdate(this.props, prevProps)){
      this.__fetchData();
    }
  }

  __fetchData = async () => {
    let data = await this.props.fetchData(this.props);
    this.setState({sponsors: data});
  }

  renderCardBatch = (batch, batchKey) => {
    return (
      <SponsorRow key={batchKey}> 
      {
        batch.map(({logo, name}, index) => {
          let key = `${name}-${index}`;
          return (
            <SponsorCard key={key}>
              <SponsorBox>
                <ImageContainer> <Image src={logo} /> </ImageContainer>
                <Quote>{name}</Quote>
              </SponsorBox>
            </SponsorCard>);
        })
      }
      </SponsorRow>)
  }

  render(){

    const sponsors = this.state.sponsors;
    let sponsorsByTier = {};
    let aux = {};
    let tiers_priorities = {};
    let tier;
    let batchKey = 0;
    for(var i=0 ; i<sponsors.length ; i++){
      tier = sponsors[i].tier;
      if (!(tier.id in sponsorsByTier)){
        sponsorsByTier[tier.id] = [];
      }
      if(!(tier.id in aux)){
        aux[tier.id] = [];
      }
      if (aux[tier.id].length === 3){
        batchKey += 1;
        sponsorsByTier[tier.id].push(this.renderCardBatch(aux[tier.id], batchKey));
        aux[tier.id] = []
      }
      aux[tier.id].push({name: sponsors[i].sponsor.name, logo: sponsors[i].sponsor.logo});
      tiers_priorities[tier.id] = {priority: tier.priority, name: tier.name};
    }

    Object.entries(aux).map(([a, b]) => {
      return b && sponsorsByTier[a].push(this.renderCardBatch(b, ++batchKey))
    });
    
    let priorities = Object.entries(tiers_priorities).sort(
      (a, b) => (b[1].priority - a[1].priority)
    ).map(([a, b]) => ({id: a, name: b.name}));

    if (this.state.sponsors.length === 0){
      return '';
    }

    return (
      <Container>
        <ContentWithPaddingXl>
          <Heading>Sponsors</Heading>
            {priorities.map(({id, name}, index) => (
              <SponsorsSeparator key={index}>
              <Subheading key={index}> {name} </Subheading>
              {sponsorsByTier[id]}
              </SponsorsSeparator>
            ))}
        </ContentWithPaddingXl>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editions: state.editions,
    language: state.language,
  };
}

export default connect(mapStateToProps)(Sponsors);
