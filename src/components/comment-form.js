import * as React from 'react';
import { connect } from 'react-redux'
import { commentActions } from '../actions/comments.actions'

const initialState = {
    comment: '',
};

class CommentForm extends React.Component {
    state = initialState;

    handleCommentChange = (e) => {
        const { value } = e.target;
        this.setState({comment: value})
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const { comment } = this.state;
        if (comment !== '') this.props.dispatch(commentActions.postComment(comment));
        this.setState({comment: ''});
    }

    render () {
        return (
            <div className='comment-add-form'>
                <input onChange={this.handleCommentChange} type='text' value={ this.state.comment } placeholder='Add a comment ...'></input>
                <button onClick={this.handleCommentSubmit} type='button'>Post</button>
            </div>
        )
    }
}

const connectedPostForm = connect()(CommentForm);

export default connectedPostForm;