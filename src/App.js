import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "personal",
      desc: "",
      time: "",
      descError: "",
      timeError: "",
      submit: false,
      personal: [],
      work: []
    };

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.submitinput = this.submitinput.bind(this);
  }

  handleChangeSelect(event) {
    var type = event.target.value;
    this.setState({type: type});
  }

  handleChange(event) {
    var desc = event.target.value;
    this.setState({desc: desc});

    if (desc.length === 0) {
      this.setState({descError: "Please type in the description", submit: false});
    }
    else if (desc.length < 5) {
      this.setState({descError: "Description must be at least 5 characters long", submit: false});
    }
    else {
      this.setState({descError: ""});
      if (this.state.time > 0 && this.state.time < 241) {
        this.setState({submit: true});
      }
    }
  }

  handleChangeTwo(event) {
    var time = event.target.value;
    this.setState({time: time});

    if (time < 1) {
      this.setState({timeError: "Time is too short", submit: false});
    }
    else if (time > 240) {
      this.setState({timeError: "Time is too long", submit: false});
    }
    else {
      this.setState({timeError: ""});
      if (this.state.desc.length > 0) {
        this.setState({submit: true});
      }
    }
  }

  submitinput(e) {
    e.preventDefault();
    if (this.state.type === "personal") {
      this.setState({personal: [...this.state.personal, {desc: this.state.desc, time: this.state.time}]});
      this.showPersonal();
    }
    else {
      this.setState({work: [...this.state.work, {desc: this.state.desc, time: this.state.time}]});
      this.showWork();
    }
    this.setState({desc: "", time: "", submit: false});
  }

  showPersonal() {
    var psum = 0;

    this.state.personal.sort((a, b) => {return b.time - a.time;});
    
    var p = this.state.personal.map((personal, i) => {
      psum = psum + parseInt(personal.time);
      var phour = parseInt(personal.time / 60);
      var pminute = personal.time % 60;
      if (pminute < 10) {
        return(<li key = {i}><h6>{phour}:0{pminute}</h6> - {personal.desc}</li>);
      }
      else {
        return(<li key = {i}><h6>{phour}:{pminute}</h6> - {personal.desc}</li>);
      }
    });

    var ptotalhour = parseInt(psum / 60);
    var ptotalminute = psum % 60;
    var ptotaltime;
    if (ptotalminute < 10) {
      ptotaltime = <h5>Total time: {ptotalhour}:0{ptotalminute}</h5>
    }
    else {
      ptotaltime = <h5>Total time: {ptotalhour}:{ptotalminute}</h5>
    }

    return (
      <div id = "personal">
        <h3>Personal</h3> {ptotaltime}
        <ul>
          {p}
        </ul>
      </div>
    )
  }

  showWork() {
    var wsum = 0;

    this.state.work.sort((a, b) => {return b.time - a.time;});

    var w = this.state.work.map((work, j) => {
      wsum = wsum + parseInt(work.time);
      var whour = parseInt(work.time / 60);
      var wminute = work.time % 60;
      if (wminute < 10) {
        return(<li key = {j}><h6>{whour}:0{wminute}</h6> - {work.desc}</li>);
      }
      else {
        return(<li key = {j}><h6>{whour}:{wminute}</h6> - {work.desc}</li>);
      }
    });
    
    var wtotalhour = parseInt(wsum / 60);
    var wtotalminute = wsum % 60;
    var wtotaltime;
    if (wtotalminute < 10) {
      wtotaltime = <h5>Total time: {wtotalhour}:0{wtotalminute}</h5>
    }
    else {
      wtotaltime = <h5>Total time: {wtotalhour}:{wtotalminute}</h5>
    }

    return (
      <div id = "work">
        <h3>Work</h3> {wtotaltime}
        <ul>
          {w}
        </ul>
      </div>
    )
  }

  workForm() {
    return (
      <div id = "workform">
        <form onSubmit = {this.submitinput}>
          Type: <select onChange = {this.handleChangeSelect} value = {this.state.type}>
            <option value = "personal">Personal</option>
            <option value = "work">Work</option>
          </select>
          <br></br><br></br>

          <div className = "error">{this.state.descError}</div>
          Description: <input type = "text" name = "desc" value = {this.state.desc}
          onChange = {this.handleChange} size = "40"></input>
          <br></br><br></br>

          <div className = "error">{this.state.timeError}</div>
          Minutes: <input type = "number" name = "time" value = {this.state.time}
          onChange = {this.handleChangeTwo} size = "number"></input>
          <br></br><br></br>
          
          <input type = "submit" className = "btn btn-primary" disabled = {!this.state.submit}
          value = "Add to list below"></input>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className = "App">
        <h1>Work Logger</h1><br></br>
        {this.workForm()}
        <div id = "blackline"></div>
        <div id = "main">
          {this.showPersonal()}
          {this.showWork()}
        </div>
      </div>
    );
  }
}

export default App;
