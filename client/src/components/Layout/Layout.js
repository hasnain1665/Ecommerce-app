import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Layout.css"; // Import the CSS file

const Layout = ({
  children,
  title = "TimeZone - Premium Watch Collection",
  description = "Discover luxury watches from world-renowned brands. Quality timepieces with precision and elegance.",
  keywords = "luxury watches, timepieces, premium watches, watch collection, branded watches",
  author = "TimeZone",
  showPageHeader = false,
  pageTitle = "",
  pageSubtitle = "",
  breadcrumbs = null,
  loading = false,
}) => {
  return (
    <div className="watch-layout">
      {/* SEO and Meta Tags */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <title>{title}</title>

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Breadcrumbs */}
      {breadcrumbs && (
        <div className="breadcrumb-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="breadcrumb-separator">›</span>}
                {crumb.link ? (
                  <a href={crumb.link}>{crumb.label}</a>
                ) : (
                  <span className="breadcrumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main id="main-content" className="watch-main" role="main">
        <div className="main-container">
          {/* Page Header */}
          {showPageHeader && (
            <div className="page-header">
              {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
              {pageSubtitle && <p className="page-subtitle">{pageSubtitle}</p>}
            </div>
          )}

          {/* Page Content with Animation */}
          <div className="page-transition">{children}</div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "#4aed88",
                secondary: "black",
              },
              style: {
                background: "linear-gradient(135deg, #28a745, #20c997)",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "linear-gradient(135deg, #dc3545, #e83e8c)",
              },
            },
            loading: {
              style: {
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                color: "#1a1a1a",
              },
            },
          }}
        />
      </main>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Error Boundary Component
export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2 className="error-title">⚠️ Something went wrong</h2>
        <p className="error-message">
          We're sorry, but something unexpected happened. Please try refreshing
          the page.
        </p>
        <button
          className="error-button"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return children;
};

export default Layout;
