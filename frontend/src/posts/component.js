import React, {Component} from "react";
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {Redirect} from 'react-router';
import {deleteComment, fetchComments, fetchPost, sendComment, sendCommentVote, sendPostVote} from "./action";
import {THUMBS_DOWN_URL, THUMBS_UP_URL} from "./constants";
import EditPost from './editPostComponent'
import EditComment from './editComment'
import Modal from 'react-modal'
import * as PostAPI from '../utils/PostApi';


class PostCommentPage extends Component {

    state = {
        comment_body: '',
        comment_author: '',
        modal_comment: {},
        post_modal_open: false,
        comment_modal_open: false,
        redirect_to_home: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let values = serializeForm(e.target, {hash: true});
        values['timestamp'] = new Date().getTime();
        values['id'] = (new Date().getTime()).toString();
        values['parentID'] = this.props.post_info.id;
        this.props.addComment(JSON.stringify(values));
        this.setState({
            comment_body: '',
            comment_author: ''
        })
    };

    componentDidMount() {
        this.props.getComments(this.props.match.params.post_id);
        this.props.getPost(this.props.match.params.post_id);
    };

    changePostVote = (voteType) => {
        this.props.votePost(this.props.post_info.id, JSON.stringify({'option': voteType}))
    };

    changeCommentVote = (comment_id, voteType) => {
        this.props.voteComment(comment_id, JSON.stringify({'option': voteType}))
    };

    removeCommentFromPost = (comment_id) => {
        this.props.removeComment(comment_id)
    };

    updateComment = (body) => {
        this.setState({comment_body: body})
    };

    updateAuthor = (author) => {
        this.setState({comment_author: author})
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

    openCommentModal = (comment) => {
        this.setState(() => ({
            comment_modal_open: true,
            modal_comment: comment

        }))
    };
    closeCommentModal = () => {
        this.setState(() => ({
            comment_modal_open: false,
            modal_comment: {}
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
            <div className="container-fluid">
                <div className="jumbotron">
                    <h3>{this.props.post_info.title}</h3>
                    <div className='row'>
                        <span className='col-lg-3'><b>Author:</b> {this.props.post_info.author}</span>
                        <span className='col-lg-2'>{(new Date(this.props.post_info.timestamp)).toDateString()}</span>
                    </div>
                    <hr/>
                    <p>{this.props.post_info.body}</p>
                    <span>
                        <img onClick={() => {
                            this.changePostVote('upVote')
                        }} src={THUMBS_UP_URL} height='30px' width='30px'/>
                        {this.props.post_info.voteScore}
                        <img onClick={() => {
                            this.changePostVote('downVote')
                        }} src={THUMBS_DOWN_URL} height='30px' width='30px'/>

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
                </div>

                <h4>Comments</h4>
                <br/>
                {this.props.comments.map((comment) => (
                    <div key={comment.id}>
                        <h5>{comment.author} - {(new Date(comment.timestamp)).toDateString()}</h5>
                        <br/>
                        <div className="jumbotron">
                            {comment.body}
                            <span>
                                <img onClick={() => {
                                    this.changeCommentVote(comment.id, 'upVote')
                                }} src={THUMBS_UP_URL} height='30px' width='30px'/>
                                {comment.voteScore}
                                <img onClick={() => {
                                    this.changeCommentVote(comment.id, 'downVote')
                                }} src={THUMBS_DOWN_URL} height='30px' width='30px'/>
                            </span>
                            <hr/>
                            <button className='btn btn-danger' onClick={() => {
                                this.removeCommentFromPost(comment.id)
                            }}>Delete
                            </button>
                            <button className='btn btn-primary' onClick={() => {
                                this.openCommentModal(comment)
                            }}>Edit
                            </button>

                        </div>
                        <hr/>
                    </div>
                ))}

                <hr/>
                <h4>Add Comment</h4>

                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div className='col-sm-offset-2'>
                        <div className="form-group">
                            <div className="form-group">
                                <div className="col-sm-10">
                                    <input type='text' className="form-control" name="author" placeholder="Author"
                                           onChange={(event) => this.updateAuthor(event.target.value)}
                                           value={this.state.comment_author}/>
                                </div>
                                <div className="col-sm-10">
                            <textarea className="form-control" rows="5" name="body" placeholder='Comment'
                                      onChange={(event) => this.updateComment(event.target.value)}
                                      value={this.state.comment_body}/>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-default btn-success'>Save</button>
                    </div>
                </form>

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

                <Modal
                    className='modal-content'
                    isOpen={this.state.comment_modal_open}
                    onRequestClose={() => {
                        this.closePostModal()
                    }}
                    contentLabel='Modal'
                >
                    {this.state.comment_modal_open &&
                    <EditComment comment={this.state.modal_comment} closeModal={() => {
                        this.closeCommentModal()
                    }}/>}
                </Modal>

            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const {post_info, comments} = state.postPage.post_page;

    return {
        ...props,
        post_info,
        comments,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (post_id) => dispatch(fetchComments(post_id)),
        getPost: (post_id) => dispatch(fetchPost(post_id)),
        votePost: (post_id, body) => dispatch(sendPostVote(post_id, body)),
        voteComment: (comment_id, body) => dispatch(sendCommentVote(comment_id, body)),
        addComment: (body) => dispatch(sendComment(body)),
        removeComment: (comment_id) => dispatch(deleteComment(comment_id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentPage)
