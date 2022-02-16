import React from "react";

class UserForm extends React.Component <{}, {user: '', phone: ''}> {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({user: event.target.value, phone: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Welcome ' + this.state.user + ', you will now start receiving pictures at ' + this.state.phone + '!');
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.user} onChange={this.handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }