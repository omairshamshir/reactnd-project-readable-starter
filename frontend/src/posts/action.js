import {GET_COMMENTS, GET_POST} from "./constants";
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

export const fetchPost = (post_id) => dispatch => (
    PostAPI
        .getPost(post_id)
        .then(post => dispatch(receivePost(post)))
);
