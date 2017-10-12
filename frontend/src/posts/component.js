import React, {Component} from "react";
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {fetchComments, fetchPost, sendComment, sendCommentVote, sendPostVote} from "./action";
import {THUMBS_DOWN_URL, THUMBS_UP_URL} from "./constants";


class PostCommentPage extends Component {

    state = {
        comment_body: '',
        comment_author: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let values = serializeForm(e.target, {hash: true});
        values['timestamp'] = new Date().getTime();
        values['id'] = (new Date().getTime()).toString();
        values['parentID'] = this.props.post_info.id;
        this.props.addComment(JSON.stringify(values))
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

    updateComment = (body) => {
        this.setState({comment_body: body.trim()})
    };

    updateAuthor = (author) => {
        this.setState({comment_author: author.trim()})
    };

    render() {
        console.log(this.props);
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
                        <button className='btn btn-danger'>Delete</button>
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
        addComment: (body) => dispatch(sendComment(body))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentPage)
