import moment from 'moment';
import { commentActionTypes } from '../constants';

function fetchComments() {
    return (dispatch) => {
        const comments = JSON.parse(localStorage.getItem('comments'));
        dispatch({ type: commentActionTypes.UPDATE_COMMENTS, comments: comments.comments })
    }
}

function postComment(text) {
    return (dispatch) => {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : {};

        comments.comments.push({
            key: comments.comments.length,
            username: 'LoggedInUser',
            text: text,
            timestamp: moment(),
            likes: 0,
            likedByUser: false,
            replies: [],
        });

        localStorage.setItem('comments', JSON.stringify(comments));
        dispatch({ type: commentActionTypes.UPDATE_COMMENTS, comments: comments.comments })
    }
}

function likeComment(key) {
    return (dispatch) => {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : {};
    
        comments.comments.forEach((comment) => {
            if (comment.key === key) {
                if (comment.likedByUser === false) comment.likes += 1;
                else comment.likes -= 1;

                comment.likedByUser = !comment.likedByUser;
            }
        });

        localStorage.setItem('comments', JSON.stringify(comments));
        dispatch({ type: commentActionTypes.UPDATE_COMMENTS, comments: comments.comments })
    }
}

function postReply(key, reply) {
    return (dispatch) => {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : {};
    
        comments.comments.forEach((comment) => {
            if (comment.key === key) {
                comment.replies.push({
                    key: comment.replies.length,
                    username: 'LoggedInUser',
                    text: reply,
                    timestamp: moment(),
                    likes: 0,
                    likedByUser: false,
                });
            }
        });

        localStorage.setItem('comments', JSON.stringify(comments));
        dispatch({ type: commentActionTypes.UPDATE_COMMENTS, comments: comments.comments })
    }
}

function likeReply(commentKey, replyKey) {
    return (dispatch) => {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : {};
    
        comments.comments.forEach((comment) => {
            if (comment.key === commentKey) {
                comment.replies.forEach((reply) => {
                    if (reply.key === replyKey) {
                        if (reply.likedByUser === false) reply.likes += 1;
                        else reply.likes -= 1;

                        reply.likedByUser = !reply.likedByUser;
                    }
                });
            }
        });

        localStorage.setItem('comments', JSON.stringify(comments));
        dispatch({ type: commentActionTypes.UPDATE_COMMENTS, comments: comments.comments })
    }
}

export const commentActions = {
    fetchComments,
    postComment,
    likeComment,
    postReply,
    likeReply,
};

