import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    render() {
        return (
            <main className="main">
                {this.props.mainData}
            </main>
        )
    }
}

export default Main
