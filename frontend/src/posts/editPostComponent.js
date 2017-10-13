import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'
import {updatePost} from "./action";

class EditPost extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let values = serializeForm(e.target, {hash: true});
        this.props.editPost(this.props.post_info.id, JSON.stringify(values));
        this.props.closeModal();
    };

    render() {
        return (
            <div className='container'>
                <h3>Edit Post </h3>
                <br/>
                <div className='col-lg-5'>

                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Title:</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" rows="1"
                                          name="title" defaultValue={this.props.post_info.title}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Body:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="5"
                                          name="body" defaultValue={this.props.post_info.body}/>
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
        editPost: (post_id, body) => dispatch(updatePost(post_id, body))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost)
