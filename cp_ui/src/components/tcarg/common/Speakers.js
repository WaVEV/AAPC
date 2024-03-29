import React from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading } from "components/misc/Headings.js";
import { ReactComponent as ArrowLeftIcon } from "../../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../../images/arrow-right-2-icon.svg";

const SpeakerSlider = styled(Slider)`
  ${tw`mt-16 relative`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
  .slick-slide > div{
    ${tw`w-full`}
  }
`;

const SpeakerContainer = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch pl-2 pr-2 sm:pl-16 sm:pr-16`;
const SpeakersCard = tw.div`mt-4 flex flex-col lg:flex-row items-center lg:items-stretch sm:pl-8 sm:pr-8 m-auto`;
const LeftImageCardContainer = tw.div`lg:w-1/4 w-full flex`;
const ImageContainer = tw.div`m-auto max-w-xs mx-auto flex flex-col items-center h-48`;
const Image = tw.img`object-contain object-left-top max-h-full`;

const RightTextCardContainer = tw.div`lg:w-3/4 w-full flex lg:flex-col flex-col sm:pl-8 justify-center items-center lg:justify-self-auto lg:items-start`;
const SpeakerName = tw.span`text-gray-600 font-medium lg:w-full mt-2`;
const Text = tw.p`mt-4 mt-8`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20 hidden sm:flex`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="right-0">
    <button {...props}>
      <ArrowRightIcon />
    </button>
  </SliderControlButtonContainer>
);
const PreviousArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="left-0">
    <button {...props}>
      <ArrowLeftIcon />
    </button>
  </SliderControlButtonContainer>
);


class Speakers extends React.Component{

  state = {
    speakers: []
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
    this.setState({speakers: data});
  }

  render(){
    if (this.state.speakers.length === 0) {
      return "";
    }
    return (
      <Container>
        <ContentWithPaddingXl>
          <Heading> {this.props.language === 'ESP' ? 'Oradores' : 'Speakers'} </Heading>
          <SpeakerSlider nextArrow={<NextArrow />} prevArrow={<PreviousArrow />}>
          {
            this.state.speakers.map((speaker, index) => (
              <SpeakerContainer key={index}>
                <SpeakersCard>
                  <LeftImageCardContainer>
                    <ImageContainer> <Image src={speaker.picture || '/static/default-user-image.png'}/> </ImageContainer>
                  </LeftImageCardContainer>
                  <RightTextCardContainer>
                    <SpeakerName> {`${speaker.name} ${speaker.surname}`} </SpeakerName>
                    <Text> {speaker.summary && speaker.summary.text.find(({language}) => language.code === this.props.language)?.summary_text} </Text>
                  </RightTextCardContainer>
                </SpeakersCard>
              </SpeakerContainer>
            ))
          }
          </SpeakerSlider>
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

export default connect(mapStateToProps)(Speakers);
