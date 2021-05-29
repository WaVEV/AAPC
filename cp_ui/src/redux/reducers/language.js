import { changeLanguageType } from '../actions/changeLanguage'

const language = (state='ESP', {type, payload}) => {
    if(type === changeLanguageType){
        return payload;
    }
    return state;
}

export default language;