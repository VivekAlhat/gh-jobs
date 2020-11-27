import React, { Component } from "react";
import Axios from "axios";
import JobCard from "./jobcard.component";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
      location: "",
      searchResult: [],
    };
  }

  onJobValueChange = (e) => {
    this.setState({
      job: e.target.value,
    });
  };

  onLocationValueChange = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const jobObject = {
      job: this.state.job,
      location: this.state.location,
    };

    Axios.post("http://localhost:8000/", jobObject)
      .then((res) => this.setState({ searchResult: res.data }))
      .catch((err) => console.log(err));

    // if (this.state.searchResult.length === 0) {
    //   alert("Currently no job openings are available in this area");
    // }
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="ml-5">
          <div className="form-row">
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                placeholder="Job Description"
                value={this.state.job}
                onChange={this.onJobValueChange}
                required={true}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={this.state.location}
                onChange={this.onLocationValueChange}
                required={true}
              />
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="row mt-3">
          {this.state.searchResult.map((e) => (
            <JobCard
              key={e.id}
              logo={e.company_logo}
              title={e.title}
              company={e.company}
              description={e.type}
              apply={e.url}
            />
          ))}
        </div>
      </div>
    );
  }
}
