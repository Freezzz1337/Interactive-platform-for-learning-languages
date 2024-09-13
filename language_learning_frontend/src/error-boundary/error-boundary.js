import React, {Component} from "react";
import Error from "./error";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    handleTryAgain() {
        this.setState({hasError: false});
    }

    render() {
        if (this.state.hasError) {
            return <Error handleTryAgain={this.handleTryAgain}/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;