import React, {Component} from 'react';
import Icon from "./Icon";

class Headertabs extends Component {
    render() {
        return (
            <ul className="header-tabs row">
                <li className="col"><a href="/test1"><Icon name="restore" classname="main-icon"/>Test</a></li>
                <li className="col active"><a href="/test1"><Icon name="favorite_border" classname="main-icon"/>Test2</a></li>
                <li className="col"><a href="/test1"><Icon name="copyright" classname="main-icon"/>Test3</a></li>
                <li className="col"><a href="/calendar_today"><Icon name="calendar_today" classname="main-icon"/>Today <Icon name="expand_more"/></a>
                </li>
            </ul>
        )
    }
}

export default Headertabs
