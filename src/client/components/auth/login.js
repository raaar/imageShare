var React = require('react');
var TextInput = require('../common/textInput'); 


var Login = React.createClass({


  render: function() {
    return (
      <div className="container-fluid">
        Login screen


        <TextInput
          placeholder="Username"    
        />

        <TextInput
          placeholder="Password"    
        />


      </div>
    )
  }
});

module.exports = Login;
