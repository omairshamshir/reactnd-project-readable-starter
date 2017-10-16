import React, {Component} from 'react';
import PostCommentPage from './posts/component'
import CreatePost from "./createPost/component";
import HomePage from "./home/component";
import CategoryPage from "./home/categoryView";
import {Route} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/create" component={CreatePost}/>
                <Route exact path="/:category/:post_id" component={PostCommentPage}/>
                <Route exact path="/:category" component={CategoryPage}/>
            </div>
        );
    }
}

export default App;
