import React, {Component} from 'react';

class Errors extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.layout === "no-live") {
            return <NoLiveGame/>;
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

export default Errors
