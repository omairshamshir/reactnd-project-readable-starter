import React, {Component} from 'react';
import PostCommentPage from './posts/component'
import CreatePost from "./createPost/component";
import HomePage from "./home/component";
import {Route} from "react-router-dom";


class App extends Component {


    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <HomePage/>
                )}/>
                <Route exact path="/create" render={() => (
                    <CreatePost/>
                )}/>

                <Route exact path="/posts/:post_id" component={PostCommentPage}/>

            </div>
        );
    }
}

export default App;
