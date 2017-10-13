import React, {Component} from "react";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

class CategoryPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h3>Posts</h3>
                <button className='btn btn-success' onClick={() =>{this.openPostModal()}}>Create
                </button>

                <hr/>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ul className="list-group">
                            {this.props.posts.filter(post => {
                                return post.category === this.props.match.params.category
                            }).map((post) => (
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

function mapStateToProps({homePage}, props) {
    const home_page = homePage.home_page;
    const {posts} = home_page;

    return {
        ...props,
        posts,
    }
}

export default connect(
    mapStateToProps,
)(CategoryPage)
