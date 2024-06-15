import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon/Icon';
import Divider from 'material-ui/Divider/Divider';
import Heart from './as.jpeg';

class ViewDetailed extends React.Component {

  componentDidMount(){
    this.loadData()
    setInterval(this.loadData, 10000);
    };

    loadData=()=>{
      var details = {
        'token':this.state.t
    };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      fetch('/doctor/viewReadings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      })
      .then(res=>res.json())
      .then(res=>{
        console.log("we are in this function");
        console.log(this.state.t);
        if(res){
         console.log(res);
         this.setState({
             loading:false,
           data:res
         });
         this.calculateAverageHeartbeat();
          console.log("After function");
          console.log(this.state.t);
        };
      }
      );
    }


  calculateAverageHeartbeat=()=>{
      if(this.state.data){
          var allData = this.state.data;
          //calculating AVG

          var avg = (parseInt(allData[allData.length-1].reading)+ parseInt(allData[allData.length-2].reading)+parseInt(allData[allData.length-3].reading))/3;
          this.setState({
              average:Math.floor(avg)
          })
      }
  }


  constructor(props){
    super(props)
    console.log(this.props.email);
    this.state={
        loading:true,
        data:{},
        t:this.props.token,
        average:0,
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="display2" style={{marginBottom:'50px'}}> Patient Detailed Monitoring</Typography>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={16}>
                <Paper style={{padding:'50px'}}>
                    {/* Patient Details  */}
                    <Typography > Patient E-Mail </Typography>
                    <Icon fontSize='large' >alternate_email</Icon>
                    <Typography variant="display2">{this.state.loading?'Loading...':this.state.data[this.state.data.length-1].email}</Typography>
                    {/* Patient Heart Beat */}
                    <Divider/>
                    <Typography > Current HeartBeat </Typography>
                    <Icon fontSize='large' >favorite_border</Icon>
                    <Typography variant="display2">{this.state.loading?'Loading...':this.state.data[this.state.data.length-1].reading}</Typography>
                    {/* Time */}
                    <Divider/>
                    <Typography > Last Checked </Typography>
                    <Icon fontSize='large' >access_time</Icon>
                    <Typography variant="display2">{this.state.loading?'Loading...':this.state.data[this.state.data.length-1].dateTime}</Typography>
                    {/* Average HeartBeat */}
                    <Divider/>
                    <Typography > Average Heart Beat </Typography>
                    <Icon fontSize='large' >access_time</Icon>
                    <Typography variant="display2">{this.state.loading?'Loading...':this.state.average}</Typography>
                </Paper>
        </Grid>
        <img src={Heart} alt="Image" />
      </div>
    );
  }
}


export default ViewDetailed;
