import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import SpeakersBase from '../common/Speakers.js';
import api from 'helpers/api'

const Speakers = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.current?.id !== prevProps.editions.current?.id;
  };
  const fetchData = (props) => {
    if (props.editions.current){
      return api.get('staffs/', 
        {params: {editions: props.editions.current.id, is_speaker:true}}
      ).then(({data}) => data);
    }
    return [];
  };
  return <SpeakersBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default Speakers;
