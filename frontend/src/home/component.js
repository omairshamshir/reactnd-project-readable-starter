import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchCategories, fetchPosts} from "./action";
import {Link} from "react-router-dom";

class HomePage extends Component {


    componentDidMount() {
        this.props.getCategories();
        this.props.getPosts();

    };

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <h3>Categories</h3>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ul className="list-group">
                            {this.props.categories.map((category) => (
                                <li key={category.name} className='list-group-item'>
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h3>Posts</h3>
                <Link to="/create">
                    <button className='btn btn-success'>Create</button>
                </Link>
                <hr/>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ul className="list-group">
                            {this.props.posts.map((post) => (

                                <li key={post.name} className='list-group-item'>
                                    <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>

        )
    }
}

function mapStateToProps({homePage}) {
    const home_page = homePage.home_page;
    const {categories, posts} = home_page;


    return {
        categories,
        posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(fetchCategories()),
        getPosts: () => dispatch(fetchPosts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
