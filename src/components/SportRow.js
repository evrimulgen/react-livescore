import React, {Component} from 'react';
import Event from "./Event";

class SportRow extends Component {
    constructor(props) {
        super(props);
    }

    static flagImg(tournament) {
        let uniqueTournamentImages = [7,8,11,384,480,679];
        if (uniqueTournamentImages.indexOf(tournament.tournament.uniqueId) > -1) {
            return (
                <div className="col flag-img">
                    <img src="/static/media/7.png" alt={tournament.tournament.name}/>
                </div>
            )
        } else {
            return (
                <div className={"col flag flag-" + tournament.category.flag}/>
            )
        }
    };

    render() {
        return (
            <div>
                {this.props.data.sportItem.tournaments.map((tournament, i) => {
                    return (
                        <div className="tournament-wrapper" key={i}>
                            <div className="tournament-title">
                                <div className="row align-items-center">
                                    {SportRow.flagImg(tournament)}
                                    <div className="col tournament-name px-2">
                                        <strong>{tournament.category.name}</strong> - {tournament.tournament.name}
                                    </div>
                                </div>
                            </div>
                            <div className="events-wrapper">
                                {tournament.events.map((event, i) => {
                                    return (<Event key={i} event={event} {...this.props}/>)
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default SportRow
