import {
    ADD_COMMENT, GET_COMMENTS, GET_POST, VOTE_COMMENT, EDIT_POST, EDIT_COMMENT, DELETE_COMMENT,
    VOTE_POST
} from "./constants";
import * as PostAPI from '../utils/PostApi';

export function receiveComments(comments) {
    return {
        type: GET_COMMENTS,
        comments
    }
}

export const fetchComments = (post_id) => dispatch => (
    PostAPI
        .getComments(post_id)
        .then(comments => dispatch(receiveComments(comments)))
);


export function receivePost(post) {
    return {
        type: GET_POST,
        post
    }
}

export function votePost(post) {
    return {
        type: VOTE_POST,
        post
    }
}

export const fetchPost = (post_id) => dispatch => (
    PostAPI
        .getPost(post_id)
        .then(post => dispatch(receivePost(post)))
);


export const sendPostVote = (post_id, body) => dispatch => (
    PostAPI
        .votePost(post_id, body)
        .then(post => dispatch(votePost(post)))
);


export function receiveComment(comment) {
    return {
        type: VOTE_COMMENT,
        comment
    }
}

export const sendCommentVote = (comment_id, body) => dispatch => (
    PostAPI
        .voteComment(comment_id, body)
        .then(comment => dispatch(receiveComment(comment)))
);

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const sendComment = (body) => dispatch => (
    PostAPI
        .addComment(body)
        .then(comment => dispatch(addComment(comment)))
);


export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export const updatePost = (post_id, body) => dispatch => (
    PostAPI
        .editPost(post_id, body)
        .then(post => dispatch(editPost(post)))
);


export function editPostComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const updateComment = (comment_id, body) => dispatch => (
    PostAPI
        .editComment(comment_id, body)
        .then(comment => dispatch(editPostComment(comment)))
);


export function removeComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const deleteComment = (comment_id) => dispatch => (
    PostAPI
        .deleteComment(comment_id)
        .then(comment => dispatch(removeComment(comment)))
);
