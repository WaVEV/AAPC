import React from "react";
import ContentTableBase from '../common/ContentTable.js'
import api from 'helpers/api'


const ContentTable = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.current?.id !== prevProps.editions.current?.id;
  };
  const fetchData = (props) => {
    if (props.editions.current){
      return api.get('lessons/', 
        {params: {edition: props.editions.current.id, ordering: 'date'}
      }).then(({data}) => data);
    }
    return [];
  };
  return <ContentTableBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default ContentTable;
