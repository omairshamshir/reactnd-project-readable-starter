import {GET_CATEGORIES, GET_POSTS} from "./constants";
import * as PostAPI from '../utils/PostApi';

export function receiveCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => dispatch => (
    PostAPI
        .getCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);


export function receivePosts(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export const fetchPosts = () => dispatch => (
    PostAPI
        .getPosts()
        .then(posts => dispatch(receivePosts(posts)))
);
