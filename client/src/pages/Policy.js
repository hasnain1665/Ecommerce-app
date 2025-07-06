import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Policy.css"; // Import the CSS file

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - TimeZone Watch Store"}>
      <div className="policy-container">
        <div className="policy-wrapper">
          {/* Header Section */}
          <div className="policy-header">
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-subtitle">Your privacy is important to us</p>
            <p className="policy-last-updated">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Main Content */}
          <div className="policy-content">
            {/* Introduction */}
            <div className="policy-section">
              <h2 className="policy-section-title">Introduction</h2>
              <p className="policy-text">
                Welcome to TimeZone Watch Store. We respect your privacy and are
                committed to protecting your personal data. This privacy policy
                will inform you about how we look after your personal data when
                you visit our website and tell you about your privacy rights and
                how the law protects you.
              </p>
              <div className="policy-highlight">
                <p className="policy-highlight-text">
                  We are committed to ensuring that your privacy is protected
                  and will only use your information in accordance with this
                  privacy statement.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="policy-section">
              <h2 className="policy-section-title">Information We Collect</h2>
              <p className="policy-text">
                We may collect the following types of information:
              </p>
              <ul className="policy-list">
                <li className="policy-list-item">
                  Personal identification information (Name, email address,
                  phone number)
                </li>
                <li className="policy-list-item">
                  Billing and shipping addresses
                </li>
                <li className="policy-list-item">
                  Payment information (processed securely through third-party
                  payment processors)
                </li>
                <li className="policy-list-item">
                  Website usage data and analytics
                </li>
                <li className="policy-list-item">
                  Cookie and tracking information
                </li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="policy-section">
              <h2 className="policy-section-title">
                How We Use Your Information
              </h2>
              <p className="policy-text">
                We use the information we collect for the following purposes:
              </p>
              <ul className="policy-list">
                <li className="policy-list-item">
                  To process and fulfill your orders
                </li>
                <li className="policy-list-item">
                  To provide customer support and respond to inquiries
                </li>
                <li className="policy-list-item">
                  To improve our website and services
                </li>
                <li className="policy-list-item">
                  To send promotional emails and updates (with your consent)
                </li>
                <li className="policy-list-item">
                  To comply with legal obligations
                </li>
              </ul>
            </div>

            {/* Data Protection */}
            <div className="policy-section">
              <h2 className="policy-section-title">Data Protection</h2>
              <p className="policy-text">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. Our security measures include:
              </p>
              <div className="policy-highlight">
                <p className="policy-highlight-text">
                  All sensitive data is encrypted using industry-standard SSL
                  encryption technology.
                </p>
              </div>
              <p className="policy-text">
                However, please remember that no method of transmission over the
                internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </div>

            {/* Cookies */}
            <div className="policy-section">
              <h2 className="policy-section-title">Cookies Policy</h2>
              <p className="policy-text">
                Our website uses cookies to enhance your browsing experience.
                Cookies are small files stored on your computer that help us
                provide personalized content and analyze website traffic.
              </p>
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Cookie Type</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Essential</td>
                    <td>Required for website functionality</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Analytics</td>
                    <td>Help us understand website usage</td>
                    <td>2 years</td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>Personalized advertising</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Your Rights */}
            <div className="policy-section">
              <h2 className="policy-section-title">Your Rights</h2>
              <p className="policy-text">You have the right to:</p>
              <ul className="policy-list">
                <li className="policy-list-item">Access your personal data</li>
                <li className="policy-list-item">
                  Correct inaccurate personal data
                </li>
                <li className="policy-list-item">
                  Request deletion of your personal data
                </li>
                <li className="policy-list-item">
                  Object to processing of your personal data
                </li>
                <li className="policy-list-item">
                  Request transfer of your personal data
                </li>
                <li className="policy-list-item">
                  Withdraw consent at any time
                </li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div className="policy-section">
              <h2 className="policy-section-title">Third-Party Services</h2>
              <p className="policy-text">
                We may use third-party services to help operate our website and
                provide services to you. These third parties have access to your
                personal information only to perform specific tasks on our
                behalf and are obligated not to disclose or use it for other
                purposes.
              </p>
            </div>

            {/* Updates to Policy */}
            <div className="policy-section">
              <h2 className="policy-section-title">Policy Updates</h2>
              <p className="policy-text">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page and updating the "Last updated" date.
              </p>
              <div className="policy-highlight">
                <p className="policy-highlight-text">
                  We encourage you to review this privacy policy periodically
                  for any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="policy-contact">
            <h3 className="policy-contact-title">
              Questions About This Policy?
            </h3>
            <p className="policy-contact-text">
              If you have any questions about this privacy policy or our data
              practices, please don't hesitate to contact us.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
