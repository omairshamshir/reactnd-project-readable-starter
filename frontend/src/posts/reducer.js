import {GET_COMMENTS, GET_POST} from "./constants";
import {initialState} from "../utils/initialState";


function postPage(state=initialState, action) {
    switch (action.type) {
        case GET_POST :
            return {
                ...state,
                ['post_page']: {
                    ...state['post_page'],
                    ['post_info']: action.post
                }
            };
        case GET_COMMENTS :
            return {
                ...state,
                ['post_page']: {
                    ...state['post_page'],
                    ['comments']: action.comments
                }
            };
        default:
            return state;
    }

}

export default postPage;
