import { postActionTypes } from '../constants';

const initialState = {
    portraitMode: true,
    likes: 56,
    timestamp: 1594502184665,
}


export function post(state = initialState, action) {    
    switch (action.type) {
        case postActionTypes.TOGGLE_ORIENTATION:
            return { 
                ...state,
                portraitMode: action.portraitMode 
            };
        default:
            return state;
    }
}