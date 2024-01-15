import {Component} from "react";
import errorMessage from "../errorMessage/errorMessage";
import ErrorMessage from "../errorMessage/errorMessage";
class ErrorBoundary extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError(error){
        return {error:true};
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error){
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;