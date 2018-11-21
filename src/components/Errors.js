import React, {Component} from 'react';
import Icon from "./Icon";

class Errors extends Component {

    render() {
        if (this.props.type === "no-live-game") {
            return <NoLiveGame/>;
        } if (this.props.type === "no-matched-game") {
            return <NothingFound/>;
        } else {
            return <Error message={this.props.message}/>
        }
    }
}

const NothingFound = () => {
    return(
        <div className="error-no-game">
            <h>No matches found.</h>
            <p className="gray">Please try different filter or date<br/></p>
        </div>
    )
};

const NoLiveGame = () => {
    return(
        <div className="error-no-game">
            <p>No live games at the moment</p>
            <p className="gray">Please check again later.<br/>
                Meanwhile here is a list of all football events for today.</p>
        </div>
    )
};

const Error = props => {
    const refresh = () => {
        window.location.reload();
    }
    return (
            <div className="fetch-alert error">
                <strong>Error!</strong>
                <p>Something went wrong :( </p>
                <div className={"error-refresh-wrapper mt-3 mb-5 d-inline-block"} onClick={refresh}>
                    <p className="error-refresh-btn mb-0"><Icon name="fas fa-redo"/></p>
                    <p className={"error-refresh-text"}>Refresh!</p>
                </div>
                <p className="small-text">
                    <code>{ props.message || ""}</code>
                </p>
            </div>
    )
};

export default Errors
