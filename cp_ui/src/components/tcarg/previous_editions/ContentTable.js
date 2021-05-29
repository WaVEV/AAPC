import React from "react";
import ContentTableBase from '../common/ContentTable.js'
import api from 'helpers/api'


const ContentTable = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.selected?.id !== prevProps.editions.selected?.id;
  };
  const fetchData = (props) => {
    if (props.editions.selected){
      return api.get('lessons/', 
        {params: {edition: props.editions.selected.id, ordering: 'date'}
      }).then(({data}) => data);
    }
    return [];
  };
  return <ContentTableBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default ContentTable;
