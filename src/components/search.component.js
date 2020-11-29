import React, { Component } from "react";
import Axios from "axios";
import JobCard from "./jobcard.component";
import JobList from "./joblist.component";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
      location: "",
      searchResult: [],
      viewas: "",
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

  onViewOptionChange = (e) => {
    this.setState({
      viewas: e.target.value,
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
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="ml-5">
          <div className="form-row d-flex justify-content-center">
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Job Description"
                value={this.state.job}
                onChange={this.onJobValueChange}
                required={true}
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={this.state.location}
                onChange={this.onLocationValueChange}
                required={true}
              />
            </div>
            <div
              className="col-2 form-group d-flex justify-content-center align-items-center"
              onChange={this.onViewOptionChange}
            >
              <label className="radio-inline mr-2">
                <input type="radio" value="card" name="viewas" /> Card
              </label>
              <label className="radio-inline ml-2">
                <input type="radio" value="list" name="viewas" /> List
              </label>
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-outline-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        {this.state.viewas === "card" ? (
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
        ) : (
          <ul className="list-group list-group-flush">
            {this.state.searchResult.map((e) => (
              <JobList
                key={e.id}
                title={e.title}
                company={e.company}
                description={e.type}
                apply={e.url}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
