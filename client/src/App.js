import React, { Component } from 'react';
import './App.css';
import PatientDrawer from './patient/Drawer';
import DoctorDrawer from './doctor/Drawer';
import Login  from './patient/Login';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class App extends Component {

 

    constructor(props){
      super(props);
      this.state={
 
       open:false,
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} handleOpen={this.handleClickOpen}/>
      }
      this.updateWareHouseDisplay.bind(this);
      this.updateHeadOfficeDisplay.bind(this);
      this.logoutFunction.bind(this);
      this.handleClickOpen.bind(this);
      this.handleClose.bind(this);
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  
  updateWareHouseDisplay = (token, email) => {
    console.log(token);
    //now send token to the required component
    this.setState({
      IsLoggedInWarehouse:true,
      onDisplay:<PatientDrawer email ={email} token={token} logoutScreen={this.logoutFunction}/>
    })
  }


  updateHeadOfficeDisplay = (token, email) => {
    console.log(token)
    this.setState({
      IsLoggedInHeadoffice:true,
      onDisplay:<DoctorDrawer token={token} email ={email}  logoutScreen={this.logoutFunction}/>
    })
  }

  logoutFunction = () => {
    console.log('logging out')
    this.setState({
      onDisplay: <Login  updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}  handleOpen={this.handleClickOpen}/>
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.onDisplay}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Invalid Username or Password
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App; 