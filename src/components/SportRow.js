import React, {Component} from 'react';
import Tournament from "./Tournament";

class SportRow extends Component {
    render() {
        let data = this.props.data;
        return (
            <div className="container py-4 px-0">
                <h1 className="px-3">{data.sportItem.sport.name}</h1>
                <div>
                    {data.sportItem.tournaments.map((tournament, i) => {
                        return (<Tournament key={i} tournament={tournament} />)
                    })}
                </div>
            </div>
        )
    }
}

export default SportRow
