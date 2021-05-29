import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import SponsorsBase from './common/Sponsors.js';
import api from 'helpers/api'

const Sponsors = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.current?.id !== prevProps.editions.current?.id;
  };
  const fetchData = (props) => {
    if (props.editions.current){
      return api.get('sponsors/', 
        {params: {edition: props.editions.current.id}}
      ).then(({data}) => data);
    }
    return [];
  };
  return <SponsorsBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default Sponsors;
