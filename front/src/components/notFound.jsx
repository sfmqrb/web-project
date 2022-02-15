import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1 className="text-center">Oops!</h1>
            <h2 className="text-center m-3">404 Not Found</h2>
            <div className="error-details text-center m-5">
              Sorry, an error has occurred, Requested page not found!
            </div>
            <div className="error-actions text-center">
              <Link to="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home">Take Me Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
