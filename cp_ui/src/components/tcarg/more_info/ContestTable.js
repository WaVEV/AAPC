import React from "react";
import ContestTableBase from '../common/ContestTable.js'
import api from 'helpers/api'


const ContestTable = () => {
  const componentNeedUpdate = (props, prevProps) => {
    return props.editions.current?.id !== prevProps.editions.current?.id;
  };
  const fetchData = (props) => {
    if (props.editions.current){
      return api.get('contests/', 
        {params: {edition: props.editions.current.id, ordering: 'date'}
      }).then(({data}) => data);
    }
    return [];
  };
  return <ContestTableBase componentNeedsUpdate={componentNeedUpdate} fetchData={fetchData}/>
}

export default ContestTable;
