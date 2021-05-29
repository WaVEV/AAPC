export const changeLanguageType = 'CHANGE_LANGUAGE';


const changeLanguage = (language) => {
	return {
		payload: language,
		type: changeLanguageType,
	}
}

export default changeLanguage;