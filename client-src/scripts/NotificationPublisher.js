var $ = require('jquery'),
  React = require('react');

var NotificationPublisher = module.exports = React.createClass({
  getInitialState: function() {
    return {
      isPublishing: false,
      message: 'Click on the button below if you spot a bear:'
    };
  },

  handlePublish: function(e) {
    // Publish platform event to Node server
    this.setState({
      isPublishing: true
    });
    $.ajax({
      method: 'POST',
      url: '/publish',
      dataType: 'json',
      cache: false,
      data: {},
      success: function(data) {
        this.setState({
          isPublishing: false,
          message: 'Notification sent!'
        });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({
          isPublishing: false,
          message: 'Failed to publish notification.'
        });
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        { this.state.isPublishing ?
          <div role="status" className="slds-spinner slds-spinner--medium slds-spinner--brand">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
          </div>
        :
          <div className="slds-modal slds-fade-in-open">
            <div className="slds-modal__container">
              <div className="slds-box">
                <p className="slds-text-heading--medium slds-m-bottom--medium slds-text-align--center">{this.state.message}</p>
                <div className="slds-align--absolute-center">
                  <button className="slds-button slds-button--brand" type="button" onClick={this.handlePublish} >
                    <svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#announcement"></use>
                    </svg>
                    Broadcast bear warning
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
});
