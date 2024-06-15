import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import _ from 'lodash';

import Radio from 'material-ui/Radio/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import FormHelperText from 'material-ui/Form/FormHelperText';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormLabel from 'material-ui/Form/FormLabel';
import Divider from 'material-ui/Divider';
import BG from './okay.jpeg';


const styles = theme => ({
  button: {
    display:'flex',
  },
  container: {
    display:'block',
    flexWrap:'wrap',
    position:"relative",
  },
  textField: {
    width: '100%',
  },
  appBar: {
    display:'block',
    position:'relative'
  },
  typeobar: {
    marginTop:100
  },

  card: {
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:60,
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  menu: {
    width: 200,
  },
});

const dropdowntypes = [
  {
    value: 'doctor',
    label: 'Doctor',
  },
  {
    value: 'patient',
    label: 'Patient',
  },
];
function validate(userName,Password) {
  return {
    userName: userName.length === 0,
    Password: Password.length === 0,
  };
}

class TextFields extends React.Component {
  constructor(props){
    super(props)

   this.state = {
      userName: '',
      Password: '',
      passcode: '',
      type:'doctor',
      open: false,
      signupEmail:'',
      signupFname:'',
      signupLname:'',
      signupPassword:'',
      signupType:'doctor',

    };

  } //constructor 





  //hanlde signup
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

    console.log(this.state);
    //have to make API req here
      var details = {
        'email': this.state.signupEmail,
        'password': this.state.signupPassword,
        'type':'patient',
        'firstname':this.state.signupFname,
        'lastname':this.state.signupLname
        };
        
      
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
          },
          body: formBody
        }).then(res=>res.json())
        .then(res=>{
          console.log("we are in this function");
            if(res){
              console.log(res);
            };
          }
        );



  };

  // signup values goes here

  changeSignupEmail = e => {
    this.setState({
      signupEmail: e.target.value
    });
  };

  changeSignupFname = e => {
    this.setState({
      signupFname: e.target.value
    });
  };

  changeSignupLname = e => {
    this.setState({
      signupLname: e.target.value
    });
  };

  changeSignupPassword = e => {
    this.setState({
      signupPassword: e.target.value
    });
  };

  handleSubmit = (evt) => {
      if (!this.canBeSubmitted()) {
        evt.preventDefault();
        return;
      }
    }
  canBeSubmitted() {
    const errors = validate(this.state.qrId);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleChange = name => event => {
    
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };




  handleClick = () => {
    console.log(this.state)
    var details = {
     'email': this.state.userName,
     'password': this.state.Password,
     'type':this.state.type
 };
 

 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 var reqtype = this.state.type.toString();
 fetch('/'+reqtype, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 }).then(res=>res.json())
 .then(res=>{
   console.log("we are in this function");
   if(res){
    console.log(res);
    console.log(res.token);
     if(res.type==="doctor"){
      this.props.updateHeadOffice(res.token , res.email);
     }
     else if(res.type==='patient'){
      this.props.updateWarehouse(res.token , res.email);
     }
     else{
       this.props.handleOpen();
     }
   };
 }
 );
  
 
 this.setState({
      userName:'',
      Password:'',
      type:'doctor'
    })

  }
  changeUsername = e => {
    this.setState({
      userName: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      Password: e.target.value
    });
}
 
  changeType = e => {
    this.setState({
      type: e.target.value
    });
  }

  logoutScreen = () => {
    this.props.logoutScreen()
  }


  render() {
    const { classes } = this.props;
    const errors = validate(this.state.userName,this.state.Password);
      const isDisabled = Object.keys(errors).some(x => errors[x]);


    return (
      <div style={{backgroundImage: "url(" + BG + ")",backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height:'100vh'}}>
           <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
        Abnormal Heart Rate Detection and Alert System Using IoT Technology
        </Typography>
      </Toolbar>
    </AppBar>
    <Typography variant="display1" color="inherit" align="center">
         <h3> Abnormal Heart Rate Detection and Alert System Using IoT Technology </h3>
         
        </Typography>
    <Card className={classes.card}>
     
    <form className={classes.container} noValidate autoComplete="off"> 
    <CardContent>
    <TextField
    id="Email"
    label="Email"
    value={this.state.userName}
    placeholder="Enter Your Email"
    className={classes.textField}
    onChange={e => this.changeUsername(e)}
    margin="normal"
  />
    </CardContent>
    <CardContent>
  <TextField
    id="Password"
    label="Password"
    value={this.state.Password}
    placeholder="Enter Your Password"
    onChange={e => this.changePassword(e)}
    className={classes.textField}
    type='password'
    margin="normal"
  />
</CardContent>
<CardContent>
<TextField
          id="type"
          select
          className={classes.textField}
          value={this.state.type}
          onChange={e=>this.changeType(e)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your type"
          margin="normal"
        >
          {dropdowntypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
</CardContent>

<CardContent>


      <Grid container spacing={8} justify="center">
         <Grid item xs={6} justify="center">
            <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} disabled={isDisabled}>
              Login
            </Button>
         </Grid>

        <Grid item xs={6} justify="center">
          <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClickOpen.bind(this)}>
            Sign-up
          </Button>
        </Grid>

      </Grid>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To signup to this service, please enter your details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              onChange={e => this.changeSignupEmail(e)}
              value={this.state.signupEmail}
              fullWidth
            />
            <TextField
              margin="dense"
              id="firstname"
              label="First Name"
              type="text"
              onChange={e => this.changeSignupFname(e)}
              value={this.state.signupFname}
            />  
            <TextField
              margin="dense"
              id="lastname"
              label="Last Name"
              type="text"
              onChange={e => this.changeSignupLname(e)}
              value={this.state.signupLname}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={e => this.changeSignupPassword(e)}
              value={this.state.signupPassword}
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Signup
            </Button>
          </DialogActions>
        </Dialog>
        
     
</CardContent>
</form>
</Card>

     
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);

