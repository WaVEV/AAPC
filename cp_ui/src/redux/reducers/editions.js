import { getEditionsType } from '../actions/getEditions'
import { selectEditionType } from '../actions/selectEdition'

const editions = (state={selected: null, current:null, editions: []}, {type, payload}) => {
    if(type === getEditionsType){
        payload.sort((a, b) => (b.year - a.year));
        const current = (payload ? payload[0] : null);
        return {
            selected: state.selected || current,
            current: current,
            editions: payload,
        }
    }
    if(type === selectEditionType){
        const selected = state.editions.find(e => e.id === payload);
        return {...state, selected: selected};
    }
    return state;
}

export default editions;