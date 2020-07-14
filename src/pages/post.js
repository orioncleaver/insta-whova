import * as React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import PostHeader from '../components/post-header';
import PostLikes from '../components/post-likes';
import PostComments from '../components/post-comments';
import CommentForm from '../components/comment-form'

class Post extends React.Component {
    render () {
        const { post } = this.props;
        const username = 'orioncleaver';
        const caption = 'Last week at the Ross School of Business!!!'

        return (
            <div>
                { post.portraitMode ?
                    <div className='post-main'> 
                        <PostHeader username={username} />
                        <img src={require('../assets/profile-pic.png')} alt="the insta post"></img>
                        <div className='post-info'>
                            <PostLikes />
                            <div className='comment'>
                                <p> <span className='comment-username'>{ username } </span>{caption}</p>
                            </div>
                            <PostComments />
                            <p className='post-timestamp'>{moment(post.timestamp).fromNow()}</p>
                        </div>
                        <CommentForm />
                    </div>
                    :
                    <div className='post-main post-main-landscape'> 
                        <img src={require('../assets/profile-pic.png')} alt="the insta post"></img>
                        <div>
                            <PostHeader username={username} />
                            <div className='post-sidebar'>
                                <PostComments />
                                <PostLikes />
                                <p className='post-timestamp'>{moment(post.timestamp).fromNow()}</p>
                            </div>
                            <CommentForm />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { post } = state;
    return { post };
}

const connectedPost = connect(mapStateToProps)(Post);

export default connectedPost;