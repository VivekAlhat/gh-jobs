const JobList = (props) => {
  return (
    <li className="list-group-item">
      <div className="job-body">
        <h4 className="card-title" style={{ fontSize: "1.2rem" }}>
          {props.title}
        </h4>
        <h5 className="company-name">{props.company}</h5>
        <p className="card-text">{props.description}</p>
        <a
          href={props.apply}
          target="_blank"
          className="btn btn-primary btn-sm"
          rel="noreferrer"
        >
          Apply Now
        </a>
      </div>
    </li>
  );
};

export default JobList;
