import uuid from 'uuid/v4';
import React from 'react';

class NoteForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = this.props.note || {content:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    
    handleNewNote(e) {
        e.preventDefault();
        this.props.handler(this.state)
    }

    render() {
        // console.log(this.props.edit);
        return (
            <form  className= {this.props.edit ? "notelistForm" : "noteForm"} onSubmit={this.handleNewNote}>
                <input 
                    placeholder="Type Note" 
                    type="textarea" 
                    name="content" 
                    value={this.state.content}
                    onChange={this.handleChange} />
                <button type="submit">{this.props.button}</button>
            </form>
        )
    }
}

export default NoteForm;