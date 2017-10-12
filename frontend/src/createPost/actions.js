import {SAVE_POST} from "./constants";
import * as PostAPI from '../utils/PostApi';

export function savePost(post) {
    return {
        type: SAVE_POST,
        post
    }
}

export const insertPost = (body) => dispatch => (
    PostAPI
        .savePost(body)
        .then(post => dispatch(savePost(post)))
);
