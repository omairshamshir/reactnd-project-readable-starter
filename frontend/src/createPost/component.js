import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {connect} from 'react-redux'
import NumericInput from 'react-numeric-input';

class CreatePost extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        let a = 9;

    };

    render() {
        return (
            <div className='container'>
                <h3>Create Post </h3>
                <br/>
                <div className='col-lg-5'>

                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Title:</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" name="title" placeholder="Enter title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Body:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="5" name="body"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Author:</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" name="author" placeholder="Enter author"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Category:</label>
                            <div className="col-sm-10">
                                <select className="form-control" name="category" value='react'>
                                    {this.props.categories.map((category) => (
                                        <option value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <button  className='btn btn-default btn-success'>Save</button>
                    </form>
                    <br/>
                    <br/>

                </div>
            </div>
        )
    }
}

function mapStateToProps({homePage}) {
    const {categories} = homePage.home_page;

    return {
        categories,
    }
}

export default connect(
    mapStateToProps,
)(CreatePost)
