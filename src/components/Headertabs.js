import React, {Component} from 'react';
import Icon from "./Icon";

class Headertabs extends Component {
    render() {
        return (
            <ul className="header-tabs row">
                <li className="col p-0">
                    <a href="/test1">
                        <Icon name="far fa-futbol mr-2"/>Futbol<Icon name="ml-2 fas fa-angle-down"/>
                    </a>
                </li>

                <li className="col-3 p-0">
                    <a href="/test1" className="justify-content-center"><Icon name="far fa-clock mr-1"/> Live</a>
                </li>
                <li className="col-3 p-0">
                    <a href="/calendar_today" className="justify-content-center">
                        Today <Icon name="ml-1 fas fa-angle-down"/>
                    </a>
                </li>
                <li className="col-2 p-0 col-filter">
                    <a href="/filter" className="justify-content-center">
                        <Icon name="ml-1 fas fa-filter"/>
                    </a>
                </li>
            </ul>
        )
    }
}

export default Headertabs
