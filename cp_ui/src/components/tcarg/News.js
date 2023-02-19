import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import tw from "twin.macro";
import Slider from "react-slick";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingLg, Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading} from "components/misc/Headings.js";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-2-icon.svg"
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-2-icon.svg"

import api from 'helpers/api'

const NewsConteiner = tw.div`h-full max-w-sm`;
const NewsElement = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Quote = tw.p`mt-5 leading-loose`;

const PostTitle = tw.h5`font-bold group-hocus:text-primary-500 transition duration-300 `;

const NewsSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

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


class News extends React.Component{
  state = {
    news: [],
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    if (this.props.editions.current){
      let data = await api.get('news/', {params: {edition: this.props.editions.current.id}}).then(({data}) => data);
      this.setState({news: data});
    }
  }

  moveSlide(shift){
    const n = this.state.news.length;
    const pos = this.state.sliderRef;
    this.setState({sliderRef: ((pos + shift) + n) % n})
  }

  componentDidUpdate(prevProps) {
    if (this.props.editions.current?.id !== prevProps.editions.current?.id) {
        this.getNews();
      }
  }


  render() {
    if (this.state.news.length === 0){
      return (<Container> </Container>);
    }
   
    return (
      <Container>
        <ContentWithPaddingLg>
          <Heading>Noticias</Heading>
          <NewsSlider nextArrow={<NextArrow />} prevArrow={<PreviousArrow />} slidesToShow={Math.min(3, this.state.news.length)}>
            {this.state.news.map((notice, index) => (
              <NewsConteiner key={index}>
                <NewsElement>
                  <PostTitle> {notice.title} </PostTitle>
                  <Quote dangerouslySetInnerHTML={{__html: notice.body}}></Quote>
                </NewsElement>
              </NewsConteiner>
            ))}
          </NewsSlider>
        </ContentWithPaddingLg>
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

export default connect(mapStateToProps)(News);
