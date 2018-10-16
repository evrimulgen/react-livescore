import React, {Component} from 'react';
import Tournament from "./Tournament";

class SportRow extends Component {
    render() {
        let data = this.props.data;
        return (
            <div>
                {data.sportItem.tournaments.map((tournament, i) => {
                    return (<Tournament key={i} tournament={tournament}/>)
                })}
            </div>
        )
    }
}

export default SportRow
