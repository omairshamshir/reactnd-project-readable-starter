import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'
import {updateComment} from "./action";

class EditComment extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        let values = serializeForm(e.target, {hash: true});
        values['timestamp'] = new Date().getTime();
        this.props.editComment(this.props.comment.id, JSON.stringify(values));
        this.props.closeModal();
    };

    render() {
        return (
            <div className='container'>
                <h3>Edit Comment </h3>
                <br/>
                <div className='col-lg-5'>
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Body:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="5"
                                          name="body" defaultValue={this.props.comment.body}/>
                            </div>
                        </div>
                        <button className='btn btn-default btn-success'>Update</button>
                    </form>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    const {post_info} = state.postPage.post_page;

    return {
        ...props,
        post_info,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editComment: (comment_id, body) => dispatch(updateComment(comment_id, body))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditComment)
