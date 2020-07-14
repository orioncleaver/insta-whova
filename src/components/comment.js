import * as React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from 'react-icons/ai';
import { commentActions } from '../actions/comments.actions'

const initialState = {
    replying: false,
    reply: '',
    viewReplies: false,
};

class Comment extends React.Component {
    state = initialState;

    handleReplyStart = () => {
        this.setState({ replying: true });
    }

    handleReplyChange = (e) => {
        const { value } = e.target;
        this.setState({reply: value})
    }

    handleReplySubmit = (e) => {
        e.preventDefault();
        const { comment } = this.props;
        const { reply } = this.state;
        if (reply !== '') this.props.dispatch(commentActions.postReply(comment.key, reply));
        this.setState({reply: '', replying: false, viewReplies: true});
    }

    handleLikeCommentToggle = () => {
        const { comment } = this.props;
        this.props.dispatch(commentActions.likeComment(comment.key))
    }

    handleLikeReplyToggle = (reply) => {
        const { comment } = this.props;
        this.props.dispatch(commentActions.likeReply(comment.key, reply.key));
    }

    handleViewReplyToggle = () => {
        const { viewReplies } = this.state;
        this.setState({viewReplies: !viewReplies})
    }

    render () {
        const { comment, portraitMode } = this.props;
        const { replying, viewReplies } = this.state;
        
        return (
            <div>
                <div className={portraitMode ? 'comment-main-portrait' : 'comment-main'}>
                    { portraitMode ? '' : 
                        <div className='user-profile-picture background-default'> 
                            <AiOutlineUser />
                        </div>
                    }
                    <div className='comment-body'>
                        <div className='comment'>
                            <p> <span className='comment-username'>{ comment.username } </span>{comment.text}</p>
                            <button onClick={this.handleLikeCommentToggle} className='comment-heart'>
                                {comment.likedByUser ? <AiFillHeart className='like-heart' /> : <AiOutlineHeart />}
                            </button>
                        </div>
                        { portraitMode ? '' : 
                            <div>
                                <div className='comment-info'>
                                    <p>{moment(comment.timestamp).fromNow()}</p>
                                    <p>{comment.likes} likes</p>
                                    <button onClick={this.handleReplyStart}>reply</button> 
                                </div>        
                            </div>
                        }
                    </div>
                </div>
                { (comment.replies.length && !portraitMode) ? 
                    <div className='comment-replies'>
                        {viewReplies ? 
                            <div>
                                <button onClick={this.handleViewReplyToggle} className='comment-hide-replies'>Hide replies</button>
                                {comment.replies.map((reply) => {
                                    return (
                                        <div key={reply.key}>
                                            <div className='comment-main'>
                                                <div className='user-profile-picture background-default'> 
                                                    <AiOutlineUser />
                                                </div>
                                                <div className='comment-body'>
                                                    <div className='comment'>
                                                        <p> <span className='comment-username'>{ reply.username } </span>{reply.text}</p>
                                                        <button onClick={() => this.handleLikeReplyToggle(reply)} className='comment-heart'>
                                                            {reply.likedByUser ? <AiFillHeart className='like-heart' /> : <AiOutlineHeart />}
                                                        </button>
                                                    </div>
                                                    <div className='comment-info comment-reply'>
                                                        <p>{moment(reply.timestamp).fromNow()}</p>
                                                        <p>{reply.likes} likes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            : <button onClick={this.handleViewReplyToggle} className='comment-view-replies'>View replies ({comment.replies.length})</button> 
                        }
                    </div>
                    : ''
                }
                { replying ? 
                    <div className='comment-add-form comment-add-reply'>
                        <input onChange={this.handleReplyChange} type='text' value={ this.state.reply } placeholder='Add a reply ...'></input>
                        <button onClick={this.handleReplySubmit} type='button'>Post</button>
                    </div>
                    : '' 
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { post } = state;
    return { portraitMode: post.portraitMode };
}

const connectedComment = connect(mapStateToProps)(Comment);

export default connectedComment;