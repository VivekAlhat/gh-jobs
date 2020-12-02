import React, { Component } from "react";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import JobCard from "./jobcard.component";
import JobList from "./joblist.component";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
      location: "",
      searchResult: [],
      dataReturned: true,
      viewas: "",
      loading: false,
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

    this.setState({ loading: true });
    Axios.post("/jobs", jobObject)
      .then((res) => {
        if (parseInt(res.headers["content-length"]) === 2) {
          this.setState({
            searchResult: res.data,
            dataReturned: false,
            loading: false,
          });
        } else {
          this.setState({
            searchResult: res.data,
            dataReturned: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container px-5">
        <h5 className="header-tag text-center mb-4">
          Find your next job with Github!
        </h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="e.g Python"
              value={this.state.job}
              onChange={this.onJobValueChange}
              required={true}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="e.g New York"
              value={this.state.location}
              onChange={this.onLocationValueChange}
              required={true}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </form>
        <hr
          className="mt-3"
          style={{ borderTop: "1px solid #839b97", width: "100%" }}
        />

        {this.state.loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}

        {this.state.dataReturned === false && (
          <p className="text-center">No data available for given parameters.</p>
        )}

        {this.state.searchResult.length > 0 && (
          <div
            className="form-group radio-group px-3"
            onChange={this.onViewOptionChange}
          >
            <label className="radio-inline mr-2">
              <input type="radio" value="card" name="viewas" /> Card
            </label>
            <label className="radio-inline ml-2">
              <input type="radio" value="list" name="viewas" /> List
            </label>
          </div>
        )}
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
          <ul className="list-group list-group-flush mt-3">
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
