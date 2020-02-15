import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { LinearProgress, Snackbar } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';

const CREATE_NOTE_API = `http://localhost:8080//createNoteReact?noteData=`
const NOTIFICATION_TOKEN_DUMMY = "asnajdnkndk2832kkf344r93849384"

export default class CreateNotePage extends React.Component {
    constructor() {
        super();
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
          inputValue: '',
          showProgress:false,
          openSnackbar:false,
          SnackBarCustomMsg:"Note Added Successfully",
          date : date
        };
      }

      updateInputValue(event) {
        this.setState({
          inputValue: event.target.value
        });
      }

    submitNoteData(){
      this.setState({showProgress:true})
         axios.get(CREATE_NOTE_API + this.state.inputValue
             + "&&noteTime=" + this.state.date
             + "&&notificationToken=" + NOTIFICATION_TOKEN_DUMMY
             ).then(res => {
                console.log(res.data);
                this.setState({openSnackbar:true})
                this.setState({showProgress:false})
                setTimeout(() => {
                  window.location = "/ShowNotes"
                }, 2000);
              })
        console.log(this.state.inputValue+this.state.date)
    }

    render() {
      return (
        <div className={'Material-TF-Style'}>
          {
        this.state.showProgress?
        <div>
        <LinearProgress> </LinearProgress>
        </div>
        :null
    }
            <h2 className={'App-header'}>Create Note</h2>
  <TextField 
  id="noteFieldValue" 
  multiline
  rowsMax="4"
  onChange={event => this.updateInputValue(event)}
  label="Enter Note" variant="outlined" />
  <Button className={'submitbtn'} onClick={ () => this.submitNoteData() } variant="contained" color="primary">
  Submit
</Button>
{
        this.state.openSnackbar?
        <div>
      <Snackbar 
      open={this.state.openSnackbar}
      anchorOrigin={{vertical:'center' , horizontal:'center'}}
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
        </div>
      )
    }
  }