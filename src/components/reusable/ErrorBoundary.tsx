import React, { Component } from "react";
import { ErrorBoundaryPage } from "components/pages/ErrorBoundaryPage";

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorBoundaryPage />;
    }
    return children;
  }
}

export default ErrorBoundary;
