import React from "react";
import PropTypes from "prop-types";
import "./ErrorBoundary.sass";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
  }

  render() {
    const { hasError, error } = this.state;
    const { children, classWrapper, classText } = this.props;

    if (hasError) {
      return (
        <div className={classWrapper}>
          <p className={classText}>{error.message}</p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classWrapper: PropTypes.string,
  classText: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  children: "",
  classWrapper: "",
  classText: "",
};

export default ErrorBoundary;
