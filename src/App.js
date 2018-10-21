import React, {Component} from 'react';
import './assets/style/app.scss';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import {Switch, Route} from "react-router-dom";
import TestComp from "./components/TestComp";
import Headertabs from "./components/Headertabs";
import $ from "jquery";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainData: null,
            loading: false
        };
        this.updateParentState = this.updateParentState.bind(this);
        this.getData = this.getData.bind(this);
    }

    updateParentState = state => {
        this.setState(state);
    };

    getData = options => {
        this.setState({
            loading: true
        });

        let jsonData = {};
        $.ajax({
            url: 'https://www.sofascore.com' + options.api,
            data: options.data
        }).done((data) => {
            jsonData = data;
        }).fail((xhr) => {
            jsonData.status = xhr.status;
        }).always(() => {
            this.setState({
                mainData: jsonData,
                loading: false
            });
            if (options.scrollToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    };

    render() {
        return (
            <div className="App">
                <Navbar getData={this.getData}/>
                <Headertabs
                    {...this.state}
                    updateParentState={this.updateParentState}
                />
                {/*<Main getData={this.getData} {...this.state}/>*/}
                <main className="main">
                    <Switch>

                        {/*<Route exact path='/' component={Homepage}/>*/}

                        <Route exact path='/' render={() => (
                            <Homepage
                                {...this.state}
                                updateParentState={this.updateParentState}
                                getData={this.getData}/>
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
