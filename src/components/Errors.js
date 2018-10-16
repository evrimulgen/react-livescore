import React, {Component} from 'react';

class Errors extends Component {
    render() {
        if (this.props.type === "no-live-game") {
            return <NoLiveGame/>;
        } else {
            return <Error status={this.props.status} message={this.props.message}/>
        }
    }
}

const NoLiveGame = () => {
    return(
        <div className="error-no-live-game">
            <p>No live games at the moment</p>
            <p>Please check again later.<br/>
                Meanwhile here is a list of all football events for today.</p>
        </div>
    )
};

const Error = props => {
    return (
            <div className="fetch-alert error"><strong>Error!</strong> Something seriously gone
                wrong :( <p><br/><code><strong>{props.status || ""}</strong><br/>{props.message || ""}</code></p></div>
    )
};

export default Errors
