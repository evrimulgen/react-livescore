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
                {this.props.mainContent}
            </main>
        )
    }
}

export default Main
