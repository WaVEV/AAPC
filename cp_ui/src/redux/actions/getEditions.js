import api from 'helpers/api'

export const getEditionsType = 'GET_EDITIONS_DATA';

const getEditions = () => {
    return dispatch => {
        api.get(
            '/editions/'
        ).then(({data}) => {
            dispatch({
                type: getEditionsType,
                payload: data,
            })
        });
    }
}

export default getEditions;