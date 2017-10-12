import {combineReducers} from "redux";
import homePage from "./home/reducer";
import postPage from "./posts/reducer";


export default combineReducers({homePage, postPage})
