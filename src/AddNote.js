import React, {Component} from 'react'
import ApiContext from './ApiContext';

export default class AddNote extends Component {
  constructor(props) {
    super(props)
    this.state ={
      noteName: '',
      noteContent: '',
      folder: '',
      folderId: '',
      validNoteMessage: '',
      validNoteName: false,
      validContentMessage: '',
      validContent: false,
      validFolderMessage: '',
      validFolder: false,
      datetime: new Date()
    }
  }

  static contextType = ApiContext;

  updateNoteName(name){
    this.setState({noteName: name}, () => {this.validateNoteName(name)})
  }
  
  updateNoteContent(content){
    this.setState({noteContent: content}, () => {this.validateNoteContent(content)})
  }

  updateFolder(name){
    this.setState({folder: name}, () => {this.validateFolder(name)})
  }

  validateFolder(name){
    let errorMsg = this.state.validFolderMessage;
    let hasError = false;
    if(!this.context.folders.find((folder) => folder.name === name)){
      errorMsg = 'Please select a valid folder'
      hasError = true;
    } else {
      errorMsg = '';
      hasError = false;
    }
      this.setState({
        validFolderMessage: errorMsg,
        validFolder: !hasError
    })
  }

  validateNoteName(name){
    let errorMsg = this.state.validNoteMessage;
    let hasError = false;
    name = name.trim();
    if(name.length < 3){
      errorMsg = 'Please enter a note name at least 3 characters long';
      hasError = true;
    } else {
      errorMsg = '';
      hasError = false;
    }
    this.setState({
      validMessage: errorMsg, 
      validNoteName: !hasError
    })
  }

  validateNoteContent(content){
    let errorMsg = this.state.validContentMessage;
    let hasError = false;
    content = content.trim();
    if(content.length < 3){
      errorMsg = 'Please enter content that is at least 3 characters long';
      hasError = true;
    } else {
      errorMsg = '';
      hasError = false;
    }
    this.setState({
      validContentMessage: errorMsg,
      validContent: !hasError
    })
  }

  addNoteRequest(name, content, folderId, date, addNote){
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: name, content: content, modified: date, folderId: folderId})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Couldn\'t add note. Sorry!')
      }
      return res.json();
    })
    .then(res => {
      addNote(res)
      this.props.history.push('/')
    })
    .catch(err => console.log(err))
  }

  render(){
    console.log(this.props)


    const handleSubmit= (event) => {
    event.preventDefault();
    console.log("working")
    const folder = this.context.folders.find((folder) => folder.name === this.state.folder)
    this.addNoteRequest(this.state.noteName, this.state.noteContent, folder.id
    , new Date(), addNote)
    console.log(folder)
  }

    const { addNote } = this.context
    console.log(this.state.validFolder, this.state.validNoteName, this.state.validContent)
    return(
      <div>
        <form onSubmit= {(event) => handleSubmit(event)}>
          <label > Note Name
            <input placeholder = "Note name" onChange = {(e) => this.updateNoteName(e.target.value)}></input>
          </label>
          <label> Note content
            <input placeholder = "Note content" onChange = {(e) => this.updateNoteContent(e.target.value)}></input>
          </label>
          <label> Folder Name
          <select name="folders" value={this.state.folder.name}
          onChange = {(e) => this.updateFolder(e.target.value)}>
        {this.context.folders.map((folder, key) => {
        return  <option 
        key={key} 
        value={folder.name}
        >
          {folder.name}
          </option>;
        })}
        </select>
          </label>
          <button type="submit" disabled={!this.state.validContent|| !this.state.validNoteName}>Submit</button>
        </form>
        {!(this.state.validNoteName && this.state.validContent && this.state.validFolder) && <p>Test</p>}
        {!this.state.validNoteName ? <p>{this.state.validNoteMessage}</p> : <></>}
        {!this.state.validContent ? <p>{this.state.validContentMessage}</p>: <></>}
        {!this.state.validFolder ? <p>{this.state.validFolderMessage}</p> : <> </>}
      </div>
    )
  }
}
