import { commentActionTypes } from '../constants';

const initialState = []

export function comments(state = initialState, action) {
    switch (action.type) {
        case commentActionTypes.UPDATE_COMMENTS:
            return action.comments;
        default:
            return state;
    }
}