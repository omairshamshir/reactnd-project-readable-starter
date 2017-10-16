import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchPosts} from "./action";
import Modal from 'react-modal'
import CreatePost from '../createPost/component';
import PostPage from '../posts/post';
import {SORT_OPTIONS} from "./constants";
import Select from "react-select";
import {ts_comparator, vote_comparator} from "../utils/helpers";

class PostList extends Component {

    state = {
        'modelOpen': false,
        'sortBy': 'voteScore'
    };

    componentDidMount() {
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

    handleSort = (sortBy) => {
        this.setState({sortBy: sortBy.value})
    };

    render() {
        const {modelOpen} = this.state;
        return (
            <div className="container-fluid">
                <h3>Posts</h3>

                <div className='row'>
                    <div className='col-sm-4'>
                        <button className='btn btn-success' onClick={() => {
                            this.openPostModal()
                        }}>Create Post
                        </button>
                    </div>

                    <div className='col-sm-offset-2 col-sm-4'>

                            <Select
                                name="sortBy"
                                value={this.state.sortBy}
                                options={SORT_OPTIONS}
                                onChange={this.handleSort}
                            />
                    </div>
                </div>

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
                            {this.props.posts.sort((this.state.sortBy === 'voteScore') ? vote_comparator : ts_comparator).map((post) => {
                                if (this.props.category && this.props.category !== post.category) {
                                    return;
                                }
                                return  <PostPage key={post.id} post_info={post}/>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({homePage}) {
    const home_page = homePage.home_page;
    const {posts} = home_page;

    return {
        posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: () => dispatch(fetchPosts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList)
