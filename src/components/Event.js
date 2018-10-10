import React, {Component} from 'react';

class Event extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="event-container">
                <div className="container">
                    <div className="row">
                        <div className="col event-team home text-right pr-0">
                            {this.props.event.homeTeam.name}
                        </div>
                        <div className="col event-score text-center font-weight-bold">
                            {this.props.event.homeScore.current} : {this.props.event.awayScore.current}
                        </div>
                        <div className="col event-team away text-left pl-0">
                            {this.props.event.awayTeam.name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event
