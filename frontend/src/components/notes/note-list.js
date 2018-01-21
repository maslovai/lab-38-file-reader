import React from 'react';
import NoteForm from './note-form';
const renderIf = (test, component, alternative) => {
    return test ? component : alternative
}

class NoteList extends React.Component{
    constructor(props){
        super(props);
    }

render() {
    return (
        <div>{
          renderIf(
            this.props.noteArray.length, 
                <ul>
                  {
                    this.props.noteArray.map((note,i) =>
                        <li key={i}>
                        <span className = "noteItems">
                            <a onClick = {() => {
                                this.props.deleteHandler(note);
                                }
                            } href="#">X</a>
                            <NoteForm edit ={true} handler={this.props.handler} button = "save edit" note={note}/>    
                        </span>    
                        </li>
                    )
                   }    
                </ul>,
                <p>NO NOTES.CREATE ONE</p>
            )
        }
    </div>
)        
}
}
export default NoteList;