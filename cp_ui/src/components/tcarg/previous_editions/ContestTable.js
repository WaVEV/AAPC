import React from "react";
import ContestTableBase from '../common/ContestTable.js'
import api from 'helpers/api'


const ContestTable = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.selected?.id !== prevProps.editions.selected?.id;
  };
  const fetchData = (props) => {
    if (props.editions.selected){
      return api.get('contests/', 
        {params: {edition: props.editions.selected.id, ordering: 'date'}
      }).then(({data}) => data);
    }
    return [];
  };
  return <ContestTableBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default ContestTable;
