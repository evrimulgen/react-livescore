import React, {Component} from 'react';
import './assets/style/app.css';
import $ from 'jquery';
import SportRow from "./components/SportRow";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Loading from "./components/Loading";
import { Switch , Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Errors from "./components/Errors";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainContent: null,
            loading: false
        };
    }

    updateParentState = state => {
        this.setState(state);
    };

    getData = options => {
        this.setState({
            loading: true
        });
        options.data = options.data || {};
        options.callback = options.callback || {};
        let content = [];
        $.ajax({
            url: 'https://www.sofascore.com' + options.api,
            data: options.data
        }).done((data) => {
            if (data.sportItem) {
                content.push(<SportRow key={1} data={data}/>)
            } else if (data.liveList) {
                content.push(<Errors />)
            }
            if (options.scrollToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }).fail((xhr) => {
            content.push(<div className="fetch-alert error" key={1}><strong>Error!</strong> Something seriously gone
                wrong :( <p><br/><code><strong>{xhr.status || ""}</strong><br/>{xhr.responseText}</code></p></div>);
        }).always(() => {
            this.setState({
                mainContent: content,
                loading: false
            });
        });
    };

    render() {
        return (
            <div className="App">
                { this.state.loading ? <Loading /> : null }
                <Navbar getData={this.getData}/>
                {/*<Main getData={this.getData} {...this.state}/>*/}
                <main className="main">
                    <Switch>
                        <Route exact path='/' render={() => (
                            <Homepage getData={this.getData} {...this.state} updateParentState={this.updateParentState}/>
                        )}/>
                        <Route exact path="/test" render={() => (
                            <TestComp/>
                        )}/>

                        {/*<Route path='/roster' component={Roster}/>*/}
                        {/*<Route path='/schedule' component={Schedule}/>*/}
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default App;
