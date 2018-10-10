import React, {Component} from 'react';
import Event from "./Event";
import '../assets/style/tournament.css';

class Tournament extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tournament-wrapper">
                <div className="tournament-title">
                    {this.props.tournament.category.name}
                </div>
                <div className="events-wrapper">
                    {this.props.tournament.events.map((event, i) => {
                        return (<Event key={i} event={event}/>)
                    })}
                </div>
            </div>
        )
    }
}

export default Tournament
