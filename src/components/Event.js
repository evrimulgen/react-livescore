import React, {Component} from 'react';
import Icon from "./Icon";

class Event extends Component {
    constructor(props) {
        super(props);
        this.favClickHandler = this.favClickHandler.bind(this);
        this.state = {
            favActive: false,
        };
    }

    isInProgress() {
        let text;
        switch (this.props.event.status.type) {
            case "inprogress":
                text =
                    <div className="live font-weight-bold">
                        {this.props.event.statusDescription}
                        {(this.props.event.status.code === 7) ? <span className="live-blinker">'</span> : null}
                    </div>;
                break;
            case "notstarted":
                text =
                    <div className="full-time font-weight-bold">
                        {this.props.event.startTime}
                    </div>;
                break;
            default:
                text =
                    <div className="full-time font-weight-bold">
                        FT
                    </div>
        }
        return text;
    }

    favClickHandler() {
        this.setState({favActive: !this.state.favActive});
    }

    render() {
        const event = this.props.event;
        return (
            <div className={this.state.favActive ? "fav-active event-container " : "event-container"}>
                <div className="container">
                    <div className="row">
                        <div className="col event-time pr-0 pl-2">
                            {this.isInProgress()}
                        </div>
                        <div className="col event-team home text-right pr-0 pl-2">
                            {event.homeTeam.name}
                        </div>
                        <div className="col event-score text-center font-weight-bold px-0">
                            {event.status.type === "notstarted" ? "-" : event.homeScore.current + ' : ' + event.awayScore.current}
                        </div>
                        <div className="col event-team away text-left pl-0 pr-2">
                            {event.awayTeam.name}
                        </div>
                        <div className="col event-fav pl-0 text-right pr-2" onClick={this.favClickHandler}>
                            {this.state.favActive ? <Icon name="fas fa-star active"/> : <Icon name="far fa-star"/>}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event
