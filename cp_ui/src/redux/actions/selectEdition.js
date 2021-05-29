export const selectEditionType = 'SELECT_EDITION';

const selectEdition = (edition) => {
    return {
        type: selectEditionType,
        payload: edition,
    }

}

export default selectEdition;