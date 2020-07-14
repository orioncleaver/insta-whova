import * as React from 'react';
import { connect } from 'react-redux'
import { postActions } from '../actions/post.actions'
import { commentActions } from '../actions/comments.actions'
import Comment from './comment';

const initialState = {
    comment: '',
};

class PostComments extends React.Component {
    state = initialState;

    componentDidMount() {
        this.props.dispatch(commentActions.fetchComments())
    }

    handleCommentChange = (e) => {
        const { value } = e.target;
        this.setState({comment: value})
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const { comment } = this.state;
        this.props.dispatch(commentActions.postComment(comment));
        this.setState({comment: ''})
    }

    handleViewAllComments = () => {
        this.props.dispatch(postActions.toggleOrientation(false));
    }

    render () {
        const { comments, portraitMode } = this.props;

        return (
            <div>
                {portraitMode ? 
                    <div>
                        <button onClick={this.handleViewAllComments} className='view-all-button'>
                            <p className='comments-view-all'> View all {comments.length} comments. </p>
                        </button>
                        {comments.slice(-2).map((c) => {
                            return (
                                <Comment key={c.key} comment={c} />
                            )
                        })}
                    </div>
                : 
                    <div>
                        <div className='full-comment'>
                            {comments.reverse().map((c) => {
                                return (
                                    <Comment key={c.key} comment={c} />
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { comments, post } = state;

    return { comments: comments, portraitMode: post.portraitMode };
}

const connectedPostComments = connect(mapStateToProps)(PostComments);

export default connectedPostComments;