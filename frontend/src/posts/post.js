import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchComments, fetchPost, sendPostVote} from "./action";
import {THUMBS_DOWN_URL, THUMBS_UP_URL} from "./constants";
import EditPost from './editPostComponent'
import Modal from 'react-modal'
import * as PostAPI from '../utils/PostApi';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";


class PostPage extends Component {

    state = {
        post_modal_open: false,
        comment_count: 0,
    };

    updateCommentCount = (post_id) => PostAPI.getComments(post_id).then(comments => {
            if (this.state.comment_count !== comments.length) {
                this.setState(() => ({
                    comment_count: comments.length
                }));
            }
        }
    );

    componentDidUpdate() {
        console.log('In comp update');
        this.updateCommentCount(this.props.post_info.id)
    };

    componentDidMount() {
        console.log('In comp mount');
        this.updateCommentCount(this.props.post_info.id)
    };


    changePostVote = (voteType) => {
        this.props.votePost(this.props.post_info.id, JSON.stringify({'option': voteType}))
    };

    openPostModal = () => {
        this.setState(() => ({
            post_modal_open: true,

        }))
    };
    closePostModal = () => {
        this.setState(() => ({
            post_modal_open: false,
        }))
    };


    deletePost = (post_id) => {
        PostAPI.deletePost(post_id).then(
            () => {
                this.setState(() => ({
                    'redirect_to_home': true
                }))
            }
        )
    };

    render() {
        if (this.state.redirect_to_home) {
            return (<Redirect to="/"/>);
        }
        return (
            <div className="jumbotron">
                <Link to={`/${this.props.post_info.category}/${this.props.post_info.id}`}>
                    <h3>{this.props.post_info.title}</h3>
                </Link>
                <div className='row'>
                    <span className='col-lg-6'><b>Author:</b> {this.props.post_info.author}</span>
                    <span className='col-lg-6'>{(new Date(this.props.post_info.timestamp)).toDateString()}</span>
                </div>
                <div className='row'>
                    <span
                        className='col-lg-6'><b>Comment Count:</b> {this.props.post_info.comment_count || this.state.comment_count}</span>
                </div>
                <hr/>
                <p>{this.props.post_info.body}</p>
                <span>
                        <img onClick={() => {
                            this.changePostVote('upVote')
                        }} src={THUMBS_UP_URL} height='20px' width='20px'/>
                    {this.props.post_info.voteScore}
                    <img onClick={() => {
                        this.changePostVote('downVote')
                    }} src={THUMBS_DOWN_URL} height='20px' width='20px'/>

                    </span>
                <hr/>
                <div>
                    <button className='btn btn-danger' onClick={() => {
                        this.deletePost(this.props.post_info.id)
                    }}>Delete
                    </button>
                    <button className='btn btn-default' onClick={() => {
                        this.openPostModal()
                    }}>Edit
                    </button>
                </div>
                <Modal
                    className='modal-content'
                    isOpen={this.state.post_modal_open}
                    onRequestClose={() => {
                        this.closePostModal()
                    }}
                    contentLabel='Modal'
                >
                    {this.state.post_modal_open && <EditPost closeModal={() => {
                        this.closePostModal()
                    }}/>}
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (post_id) => dispatch(fetchComments(post_id)),
        votePost: (post_id, body) => dispatch(sendPostVote(post_id, body)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage)
