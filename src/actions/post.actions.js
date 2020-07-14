import { postActionTypes } from '../constants';

function toggleOrientation() {
    return {
        type: postActionTypes.TOGGLE_ORIENTATION,
        portraitMode: false,
    }
}

export const postActions = {
    toggleOrientation,
};

