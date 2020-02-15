import React from 'react';
import axios from 'axios';
import { LinearProgress, Snackbar } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import {Link} from 'react-router-dom'
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Container, Button} from 'react-floating-action-button'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import Utils from './Utils'
import Iframe from 'react-iframe'


const READ_API = `http://localhost:8080//readNotesReact`
const DELETE_API = `http://localhost:8080//deleteNoteReact?noteId=`
const SORT_API = `http://localhost:8080//sortNoteReact?sortType=1`
const FILTER_API = `http://localhost:8080//filterNoteReact?startDate=`
const CREATE_NOTE_PAGE = `/createNotePage`

export default class ShowNotes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showProgress:true,
      openSnackbar:false,
      fabShow:false,
      showAllViews:false,
      showLoadingGif:false,
      searchValue:"",
      SnackBarCustomMsg:"Notes Data Loaded Successfully",
      showSheet:false,
      notes: [],
      notesDataList: [],
    };
  }

  //Below Method is to Execute Delete Note Code and show rest of refresh note list:-
  deleteClickedHandle(noteId) {
    this.setState({showProgress : true})
    axios.get(DELETE_API + noteId
       ).then(res => {
          console.log(res.data);
          this.setState({openSnackbar:true})
          this.setState({SnackBarCustomMsg: "Note Deleted Successfully"})
          this.componentWillMount()
        })
}

//Below Method is used to Filter Notes Data on Basis of Filter Applied:-
applyFilter(filterStatus){
  var customDates = new Utils().getFilterBasedDates(filterStatus)
  console.log(customDates.x)
  console.log(customDates.y)              
  this.showHideBottomSheet(false)
  this.setState({showProgress : true})
  axios.get(FILTER_API + customDates.x +
     "&&endDate=" + customDates.y
     ).then(res => {
       if(res.data.length > 0){
        console.log(res.data);
        this.setState({openSnackbar:true})
        this.setState({SnackBarCustomMsg: "Note Filter Successfully"})
        this.setState({notesDataList : res.data})
        this.setState({showProgress : false})
       }else{
        this.setState({openSnackbar:true})
        this.setState({SnackBarCustomMsg: "Note Filtered Data not found"})
        this.setState({notesDataList : res.data})
        this.setState({showProgress : false})
       }
      })
}

//Below Method is to Search and Show Updated Search Notes List:-
searchUpdatedNotes(event){
  if(event.target.value !==""){
    let searchList = this.state.notes;
    searchList = searchList.filter(note => {
      return note.noteData.toLowerCase().search(
        event.target.value.toLowerCase()
        ) !== -1;
    });

    this.setState({
      notesDataList: searchList
    });
  }else{
this.setState({
  notesDataList : this.state.notes
})
  }
}

//Below Method is used to sort Notes data A-Z:-
sortNotes(){
  console.log("Sort Clicked")
  this.setState({showProgress : true})
    axios.get(SORT_API).then(res => {
      const notes = res.data;
      console.log(notes)
      if(notes.length > 0){
          this.setState({ notesDataList : notes });
          this.setState({openSnackbar:true})
          this.setState({SnackBarCustomMsg: "Note Data Sorted A-Z Successfully"})
          this.setState({showProgress : false})
        }else{
          this.setState({openSnackbar:true})
          this.setState({SnackBarCustomMsg: "Note Data not found"})
          this.setState({showProgress : false})
        }
      
      })
}
  
//Below method called Twice time in the lifecycle of this class and load initial Notes Data:-
componentWillMount() {
      axios.get(READ_API)
        .then(res => {
          const notes = res.data;
          console.log(notes)
          this.setState({ notes });
          this.setState({notesDataList: notes})
          this.setState({showProgress: false});
          if(notes.length > 0){
            this.setState({SnackBarCustomMsg: "Notes Data Loaded Successfully"})
            this.setState({openSnackbar:true})
            this.setState({fabShow:true})
            this.setState({showAllViews:true})
          }else{
            this.setState({SnackBarCustomMsg: "Notes not found"})
            this.setState({openSnackbar:true})
            this.setState({fabShow:false})
            this.setState({showAllViews:false})
          }
        })
    }
    
    //Below method is used to show/hide BottomSheet:-
    showHideBottomSheet(status){
      this.setState({showSheet : status})
      if(status)
      document.getElementById('table-root-view').style.filter = 'blur(1px)'
      else
      document.getElementById('table-root-view').style.filter = 'blur(0px)'
    }

  
  //Below Method is used To Render Table Notes List Data:-
  renderdata = () => {
    return this.state.notesDataList.map((note, i) => <tr key={i}><td>{note.noteId}</td><td>{note.noteData}</td><td>{note.noteTime}</td>
    <td><Link to={{
  pathname: '/EditNote',
  state: {
    notePassData: this.state.notesDataList[i]
  }
}} className={'editbtn'}>Edit</Link></td>
    <td><button onClick={ () => this.deleteClickedHandle(this.state.notes[i].noteId) } className={'deletebtn'}>Delete</button></td>
    </tr>)
    }
  
    //Render Method to render View on Reactjs:-
    render(){
    return(
      <div 
      id='app-root'
      className={'main-div'}>
         {
        this.state.showProgress?
        <div>
        <LinearProgress> </LinearProgress>
        </div>
        :null
    }

{
        this.state.showLoadingGif?
        <div>
          <Iframe
          src="https://giphy.com/embed/O6Lpb90pyxDRm"
        width="1000px"
        height="1000px"
        id="myId"
        className="myClassname"
        display="block"
        frameBorder={0}
        allowFullScreen
        styles={{height: "25px"}}
        position="relative"/>
         </div>
        :null
      }


{
this.state.showAllViews?
<div
id='table-root-view'
>
        <h2 className={'App-header'}>Notes List</h2>
<TextField 
  id="noteSearchValue" 
  rowsMax="1"
  type="text"
  fullWidth={true}
  defaultValue={this.state.searchValue}
  onChange={event => this.searchUpdatedNotes(event)}
  label="Search Note" variant="outlined" 
  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
  />
    <table class = "noteTable" border="1" align="center">
    <thead><tr><th>Note Id</th><th>Note</th><th>Note Time</th><th>Note Update</th><th>Note Delete</th></tr></thead>
    <tbody>
    {this.renderdata()}
    </tbody>
    </table>
    </div>
  : null

        }
    {
      this.state.fabShow?
      <div>
   <Container>
            <Button 
                tooltip="Sort Note"
                onClick={() => this.sortNotes()}
                icon="fa fa-sort-alpha-asc"/>

            <Button
                tooltip="Filter Note"
                icon="fa fa-filter"
                onClick={() => this.showHideBottomSheet(true)}/>

            <Button
                tooltip="Create note link"
                icon="fa fa-plus" 
                onClick={() => {window.location = CREATE_NOTE_PAGE}}/>
                
            <Button
                tooltip="The big plus button!"
                icon="fa fa-bars"
                rotate={true}
                />
        </Container>
      </div>
      :null
    }
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
    {
      this.state.showSheet?
      <div className={'SwipeableStyle'}>
        <SwipeableBottomSheet 
        overflowHeight={150}>
	<div style={{ height : 250}}>
  <h1 className={'BottomSheetHeadingStyle'} 
  i className="fa fa-times-circle"
  onClick={() => {this.showHideBottomSheet(false)}}
  >Filter Note Data</h1>
  <hr className={'HorizontalLineStyle'}/>
    <form class="form-horizontal">
      <div class="form-group">
<button 
className={'filterButtonStyle'}
onClick={() => {this.applyFilter(0)}}>
Today
</button>

<button 
className={'filterButtonStyle'}
onClick={() => {this.applyFilter(1)}}>
Yesterday
</button>

<button 
className={'filterButtonStyle'}
onClick={() => {this.applyFilter(2)}}>
Week
</button>

<button 
className={'filterButtonStyle'}
onClick={() => {this.applyFilter(3)}}>
Month
</button>

<button 
className={'filterButtonStyle'}
onClick={() => {this.componentWillMount()}}>
All
</button>
</div>
</form>
	</div>
</SwipeableBottomSheet>
        </div>
        :null
    }
    </div>
  )
  }
  }