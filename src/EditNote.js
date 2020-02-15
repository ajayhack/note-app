import React from 'react';
import { render } from 'react-dom';
import style from './App.css';
import ShowNotes from './ShowNotes'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { LinearProgress, Fab, Snackbar } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withRouter } from 'react-router-dom';

const UPDATE_NOTE_API = `http://localhost:8080//updateNoteReact?noteId=`

export default withRouter(class EditNote extends React.Component {

  constructor(props){
    super(props)
    this.state={
      updateValue: '',
      showProgress:false,
      openSnackbar:false,
      SnackBarCustomMsg:"Note Update Successfully",
      noteID :this.props.location.state.notePassData.noteId,
      noteData : this.props.location.state.notePassData.noteData,
      noteTime : this.props.location.state.notePassData.noteTime,
    }
    
  }

  componentDidMount(){
    console.log(this.props.location)
  }

  updateInputValue(event) {
    this.setState({
      updateValue: event.target.value
    });
  }


  updateNoteData(){
    this.setState({showProgress:true})
       axios.get(UPDATE_NOTE_API + this.state.noteID
           + "&&noteData=" + this.state.updateValue
           ).then(res => {
              console.log(res.data);
              this.setState({openSnackbar:true})
              this.setState({showProgress:false})
              setTimeout(() => {
                window.location = "/ShowNotes"
              }, 2000);
            })
  }
 
    render() {
      const { classes } = this.props;
      return (
        <div>
           {
        this.state.showProgress?
        <div>
        <LinearProgress> </LinearProgress>
        </div>
        :null
    }
            <h2 className={'App-header'}>Edit Note</h2>
         <form className={'Material-TF-Style'}>
  <TextField id="editNoteId" 
  defaultValue="1"
  value={this.state.noteID}
  label="Note ID" 
  disabled
  variant="outlined" />
  <TextField 
  id="editNoteField" 
  multiline
  rowsMax="4"
  onChange={event => this.updateInputValue(event)}
  defaultValue={this.state.noteData}
  label="Note" variant="outlined" />
  <TextField id="editNoteTime"
  disabled
  defaultValue="2020-02-08"
   label="Note Time"
    variant="outlined" 
    value={this.state.noteTime}/>
    <Button className={'submitbtn'} onClick={ () => this.updateNoteData() } variant="contained" color="primary">
  Update
</Button>
{
        this.state.openSnackbar?
        <div>
      <Snackbar 
      open={this.state.openSnackbar}
      message={<span id="snackMsgId">{this.state.SnackBarCustomMsg}</span>}
      autoHideDuration={1500}
      onClose={() => this.setState({openSnackbar: false})}
      >
        <SnackbarContent style={{
         backgroundColor:'green',
    }}
    message={<span id="snackMsgId">{this.state.SnackBarCustomMsg}</span>}
  />
</Snackbar>
</div>
:null
    }
</form>
        </div>
      )
    }
  }
)