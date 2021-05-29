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
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

const SpeakerContainer = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch pl-16 pr-16`;
const SpeakersCard = tw.div`mt-4 flex flex-col lg:flex-row items-center lg:items-stretch pl-8 pr-8`;
const LeftImageCardContainer = tw.div`lg:w-1/4 md:w-full flex`;
const Image = tw.img`max-w-full h-auto md:w-full object-contain object-left-top`;

const RightTextCardContainer = tw.div`lg:w-3/4 md:w-full flex lg:flex-col md:flex-col pl-8`;
const SpeakerName = tw.h5`text-gray-600 font-medium md:w-full md:mt-8`;
const Text = tw.p`mt-4 md:mt-8`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
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
                    <Image src={speaker.picture || '/static/default-user-image.png'}/>
                  </LeftImageCardContainer>
                  <RightTextCardContainer>
                    <SpeakerName> {`${speaker.name} ${speaker.surname}`} </SpeakerName>
                    <Text> {speaker.summary && speaker.summary.text.find(({language}) => language.code === this.props.language).summary_text} </Text>
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
