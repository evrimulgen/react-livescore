import React, {Component} from 'react';
import Event from "./Event";

class Tournament extends Component {
    render() {
        return (
            <div>
                {this.props.data.sportItem.tournaments.map((tournament, i) => {
                    return (
                        <div className="tournament-wrapper" key={i}>
                            <div className="tournament-title">
                                <div className="row align-items-center">
                                    {this.props.flagImg(tournament)}
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
export default Tournament
