var axios = require('axios');

triggerOnDemandRead = () => {
  console.log('starting');
  axios
    .get('http://localhost:3002/api/ondemand/ondemandnewread')
    .then((response) => {
      console.log('');
      console.log('Data from Get All onDemand data Request:');
      console.log(response.data);
      // this.setState({ data: response.data, isLoading: false });
      // console.log(this.state);
      this.handleGetOnDemandData();
    })
    .catch(function (error) {
      console.log(error);
    });
};

triggerOnDemandRead();
