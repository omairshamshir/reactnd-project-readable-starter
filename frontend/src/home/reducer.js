import {GET_CATEGORIES, GET_POSTS} from "./constants";
import {initialState} from "../utils/initialState";
import {SAVE_POST} from "../createPost/constants";


function homePage(state=initialState, action) {
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
        default:
            return state;
    }

}

export default homePage;
