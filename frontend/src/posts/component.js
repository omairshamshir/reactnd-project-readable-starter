import React, {Component} from "react";
import {connect} from 'react-redux'
import {fetchComments, fetchPost} from "./action";
import {THUMBS_DOWN_URL, THUMBS_UP_URL} from "./constants";


class PostCommentPage extends Component {

    componentDidMount() {
        this.props.getComments(this.props.match.params.post_id);
        this.props.getPost(this.props.match.params.post_id);

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
                </div>

                <h4>Comments</h4>
                <br/>
                {this.props.comments.map((comment) => (
                    <div key={comment.id}>
                        <h5>{comment.author} - {(new Date(comment.timestamp)).toDateString()}</h5>
                        <br/>
                        <div className="jumbotron">
                            {comment.body}
                            <br/>
                            <br/>
                            <span>
                            <img src={THUMBS_UP_URL} height='30px' width='30px'/>
                                {comment.voteScore}
                                <img src={THUMBS_DOWN_URL} height='30px' width='30px'/>
                                </span>
                        </div>
                        <hr/>
                    </div>



                ))}
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
        getPost: (post_id) => dispatch(fetchPost(post_id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentPage)
