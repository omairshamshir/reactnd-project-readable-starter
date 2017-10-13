import {
    ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, EDIT_POST, GET_COMMENTS, GET_POST, VOTE_COMMENT,
    VOTE_POST
} from "./constants";
import {initialState} from "../utils/initialState";


function postPage(state = initialState, action) {
    switch (action.type) {

        case GET_POST :
        case VOTE_POST :
        case EDIT_POST:
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

        case VOTE_COMMENT :
        case EDIT_COMMENT :
            return {
                ...state,
                ['post_page']: {
                    ...state['post_page'],
                    ['comments']: state.post_page.comments.map(comment => {
                        if (comment.id === action.comment.id) {
                            return action.comment
                        }
                        return comment
                    })
                }
            };

        case DELETE_COMMENT :
            return {
                ...state,
                ['post_page']: {
                    ...state['post_page'],
                    ['comments']: state.post_page.comments.filter(comment => {
                        return comment.id !== action.comment.id;
                    }).map(comment => {
                        if (comment.id === action.comment.id) {
                            return action.comment
                        }
                        return comment
                    })
                }
            };


        case ADD_COMMENT:
            return {
                ...state,
                ['post_page']: {
                    ...state['post_page'],
                    ['comments']: [...state.post_page.comments, action.comment]
                }
            };


        default:
            return state;
    }

}

export default postPage;
