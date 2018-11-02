import React, {Component} from 'react';

class Errors extends Component {
    render() {
        if (this.props.type === "no-live-game") {
            return <NoLiveGame/>;
        } if (this.props.type === "no-matched-game") {
            return <NothingFound/>;
        } else {
            return <Error status={this.props.status} message={this.props.message}/>
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
    return (
            <div className="fetch-alert error"><strong>Error!</strong> Something seriously gone
                wrong :( <p><br/><code><strong>{props.status || ""}</strong> - {props.message || ""}</code></p></div>
    )
};

export default Errors
