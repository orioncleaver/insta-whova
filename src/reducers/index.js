import { combineReducers } from 'redux';
import { comments } from './comments.reducer';
import { post } from './post.reducer'

const rootReducer = () => combineReducers({
    comments,
    post,
});

export { rootReducer }