import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchCategories, fetchPosts} from "./action";
import {Link} from "react-router-dom";
import Modal from 'react-modal'
import CreatePost from '../createPost/component';

class HomePage extends Component {

    state = {
        'modelOpen': false
    };

    componentDidMount() {
        this.props.getCategories();
        this.props.getPosts();

    };

    openPostModal = () => {
        this.setState(() => ({
            modelOpen: true,

        }))
    };
    closePostModal = () => {
        this.setState(() => ({
            modelOpen: false,
        }))
    };

    render() {
        console.log(this.props);
        const {modelOpen} = this.state;
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
                <h3>Posts</h3>
                <button className='btn btn-success' onClick={() => {
                    this.openPostModal()
                }}>Create
                </button>
                <Modal
                    className='modal-content'
                    isOpen={modelOpen}
                    onRequestClose={() => {
                        this.closePostModal()
                    }}
                    contentLabel='Modal'
                >
                    {modelOpen && <CreatePost closeModal={() => {
                        this.closePostModal()
                    }}/>}
                </Modal>

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
