import React, {Component} from 'react';

class Icon extends Component {
    render() {
        return (
            <i className={"material-icons " + this.props.name + (this.props.classname ? ' ' + this.props.classname : '')}>{this.props.name}</i>
        )
    }
}
export default Icon
