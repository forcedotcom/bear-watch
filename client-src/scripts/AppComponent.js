var $ = require('jquery'),
  React = require('react');

var NavBar = require('./NavBarComponent.js'),
  LoginPanel = require('./LoginPanelComponent.js'),
  NotificationPublisher = require('./NotificationPublisher.js');


var App = module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },

  componentDidMount: function() {
    // Get logged in user
    $.ajax({
      url: '/auth/whoami',
      dataType: 'json',
      success: function(data) {
        this.setState({user: data});
      }.bind(this),
      error: function(xhr, status, err) {
        if (xhr.status != 401) // Ignore 'unauthorized' responses before logging in
          console.error('Failed to retrieve logged user.');
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <NavBar user={this.state.user} />
        { this.state.user == null ?
          <LoginPanel />
          :
          <NotificationPublisher/>
        }
      </div>
    );
  }
});
