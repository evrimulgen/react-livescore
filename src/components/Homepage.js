import React, {Component} from 'react';
import $ from "jquery";
import SportRow from "./SportRow";
import Errors from "./Errors";
import Loading from "./Loading";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveGames: null,
            loading: false,
            liveSwitch: true,
        };
        this.toggleLiveSwitch = this.toggleLiveSwitch.bind(this);
    }

    getData = options => {
        this.setState({
            loading: true
        });
        let content = [];

        $.ajax({
            url: 'https://www.sofascore.com' + options.api,
        }).done((data) => {
            if (data.sportItem) {
                content.push(<SportRow key={1} data={data}/>)
            } else if (data.liveList) {
                content.push(<Errors type="no-live-game"/>)
            }
            if (options.scrollToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }).fail((xhr) => {
            content.push(<Errors type="error" message={xhr.responseText} status={xhr.status}/>);
        }).always(() => {
            this.setState({
                liveGames: content,
                loading: false
            });
        });
    };

    toggleLiveSwitch() {
        const currentState = this.state.liveSwitch;
        this.setState({liveSwitch: !currentState});
    }

    componentDidMount() {
        this.getData({
            //api: '/football/livescore/json',
            api: '/football//2018-10-03/json',
            data: null
        });
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Loading/> : null}
                <div className="container py-4 px-0">
                    <div className="row mb-3 mx-0 align-items-center">
                        <div className="col">
                            <p className="m-0">Live Football</p>
                        </div>
                        <div className="col">
                            <span className="switch-container">
                            <span className={'switch ml-auto' + (this.state.liveSwitch ? ' active' : '')}
                                  onClick={this.toggleLiveSwitch}>
                                <span className="dot"/>
                            </span>
                            <span className="switch-title">Live (32)</span>
                        </span>
                        </div>
                    </div>
                    <div>
                        {this.state.liveGames}
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
