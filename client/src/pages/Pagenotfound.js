import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/PageNotFound.css";

const Pagenotfound = () => {
  return (
    <Layout title={"404 - Page Not Found"}>
      <div className="pnf">
        <div className="pnf-container">
          <div className="pnf-watch-icon">⌚</div>
          <h1 className="pnf-title">404</h1>
          <h2 className="pnf-heading">Time's Up!</h2>
          <p className="pnf-description">
            Looks like this page has slipped through time. The page you're
            looking for doesn't exist.
          </p>
          <div className="pnf-actions">
            <Link to="/" className="pnf-btn pnf-btn-primary">
              Back to Home
            </Link>
            <Link to="/categories" className="pnf-btn pnf-btn-secondary">
              Browse Watches
            </Link>
          </div>
        </div>
        <div className="pnf-background">
          <div className="pnf-gear pnf-gear-1">⚙️</div>
          <div className="pnf-gear pnf-gear-2">⚙️</div>
          <div className="pnf-gear pnf-gear-3">⚙️</div>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
