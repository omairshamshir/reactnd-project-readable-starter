import React, {Component} from "react";
import PostList from './postList';


class CategoryPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <PostList category={this.props.match.params.category}/>
                <hr/>
            </div>
        )
    }
}


export default CategoryPage;
