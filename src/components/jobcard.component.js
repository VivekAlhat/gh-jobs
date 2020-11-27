const JobCard = (props) => {
  return (
    <div className="col-md-4">
      <div className="card m-2">
        <img className="card-img-top" src={props.logo} alt="job-card" />
        <hr style={{ borderTop: "1px solid #839b97" }} />
        <div className="card-body">
          <h4 className="card-title" style={{ fontSize: "1.2rem" }}>
            {props.title}
          </h4>
          <h5 className="company-name">{props.company}</h5>
          <p className="card-text">Type : {props.description}</p>
          <a
            href={props.apply}
            target="_blank"
            className="btn btn-primary btn-sm"
            rel="noreferrer"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
