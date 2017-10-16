import {GET_CATEGORIES, GET_POSTS} from "./constants";
import {initialState} from "../utils/initialState";
import {SAVE_POST} from "../createPost/constants";
import {EDIT_POST, GET_COMMENTS, VOTE_POST} from "../posts/constants";


function homePage(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES :
            return {
                ...state,
                ['home_page']: {
                    ...state['home_page'],
                    ['categories']: action.categories
                }
            };
        case GET_POSTS :
            return {
                ...state,
                ['home_page']: {
                    ...state['home_page'],
                    ['posts']: action.posts
                }
            };

        case SAVE_POST :
            return {
                ...state,
                ['home_page']: {
                    ...state['home_page'],
                    ['posts']: [...state['home_page']['posts'], action.post]
                }
            };

        case VOTE_POST :
        case EDIT_POST :
            return {
                ...state,
                ['home_page']: {
                    ...state['home_page'],
                    ['posts']: state.home_page.posts.map(post => {
                        if (post.id === action.post.id) {
                            return action.post
                        }
                        return post
                    })
                }
            };

        default:
            return state;
    }

}

export default homePage;
