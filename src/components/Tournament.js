import React, {Component} from 'react';
import Event from "./Event";

class Tournament extends Component {

    flagImg() {
        let uniqueTournamentImages = [7,8,11,384,480,679];
        if (uniqueTournamentImages.indexOf(this.props.tournament.tournament.uniqueId) > -1) {
            return (
                <div className="col flag-img">
                    <img src="/static/media/7.png" alt={this.props.tournament.tournament.name}/>
                </div>
            )
        } else {
            return (
                <div className={"col flag flag-" + this.props.tournament.category.flag}/>
            )
        }
    };

    render() {
        return (
            <div className="tournament-wrapper">
                <div className="tournament-title">
                    <div className="row align-items-center">
                        {this.flagImg()}
                    <div className="col tournament-name px-2">
                        <strong>{this.props.tournament.category.name}</strong> - {this.props.tournament.tournament.name}
                    </div>
                    </div>
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
