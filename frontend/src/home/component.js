import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchCategories, fetchPosts} from "./action";
import {Link} from "react-router-dom";
import PostList from './postList'

class HomePage extends Component {

    state = {
        'modelOpen': false
    };

    componentDidMount() {
        this.props.getCategories();
    };

    render() {
        return (
            <div className="container-fluid">
                <h3>Categories</h3>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ul className="list-group">
                            {this.props.categories.map((category) => (
                                <li key={category.name} className='list-group-item'>
                                    <Link to={`/${category.path}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <PostList/>
            </div>
        )
    }
}

function mapStateToProps({homePage}) {
    const home_page = homePage.home_page;
    const {categories} = home_page;


    return {
        categories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
