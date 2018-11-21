import React, {Component} from 'react';
import './assets/style/app.scss';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import {Route, Switch} from "react-router-dom";
import TestComp from "./components/TestComp";
import Headertabs from "./components/Headertabs";
import moment from "moment";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainData: null,
            loading: false,
            orjData: null
        };
        this.updateParentState = this.updateParentState.bind(this);
        this.getData = this.getData.bind(this);
        this.interval = null;
    };

    updateParentState = (state) => {
        return new Promise((resolve) => {
            this.setState(state, () => {
                resolve()
            });
        });
    };

    flagImg(tournament) {
        let uniqueTournamentImages = [7, 8, 11, 384, 480, 679];
        if (uniqueTournamentImages.indexOf(tournament.tournament.uniqueId) > -1) {
            return (
                <div className="col flag-img">
                    <img
                        src={(process.env.NODE_ENV === 'production' ? '/livescore/' : '/') + "static/media/" + tournament.tournament.uniqueId + ".png"}
                        alt={tournament.tournament.name}/>
                </div>
            )
        } else {
            return (
                <div className={"col flag flag-" + tournament.category.flag}/>
            )
        }
    };

    preprocessData = data => {
        // Custom Sorting - Move some tournaments to the top or bottom of the list (FYI: 62 = Turkey Super Lig, 309 = CONMEBOL Libertadores)
        let moveToTop = [62, 63]; // tournament Id's in order that you want at top i.e: [62, 36, 33]
        let moveToBottom = [309]; // tournament Id's in the reverse order that you want at the bottom i.e: [309,310]
        let tournaments = data.sportItem.tournaments;
        for (let i = 0; i < tournaments.length; i++) {
            for (let k = 0; k < moveToTop.length; k++) {
                if (tournaments[i].tournament.id === moveToTop[k]) {
                    let a = tournaments.splice(i, 1); // removes the item
                    tournaments.unshift(a[0]); // adds it back to the beginning
                    break;
                }
            }
            for (let k = 0; k < moveToBottom.length; k++) {
                if (tournaments[i].tournament.id === moveToBottom[k]) {
                    let a = tournaments.splice(i, 1); // removes the item
                    tournaments.push(a[0]); // adds it back to the end
                    break;
                }
            }
        }

        // remove yesterday matches
        let currentDate = data.params.date;
        data.sportItem.tournaments = data.sportItem.tournaments.reduce(function (whole, tournament) {
            tournament.events = tournament.events.filter((event) => {
                return moment(event.startTimestamp * 1000).format('YYYY-MM-DD') === currentDate;
            });
            tournament.events.forEach(() => {
                if (whole.indexOf(tournament) < 0) whole.push(tournament);
            });
            return whole;
        }, []);
        return data;
    };

    getData = options => {
        if (options.loading) this.setState({loading: true});
        let jsonData = {};
        fetch('https://www.sofascore.com' + options.api, {referrerPolicy: "no-referrer", cache: "no-store"})
            .then(res => res.json())
            .then(
                (result) => {
                    if (options.interval) {
                        clearInterval(this.interval);
                        this.interval = setInterval(() => {
                            this.getData({
                                api: options.api,
                                loading: false
                            });
                        }, options.intervaltime || 10000);
                    }
                    jsonData = this.preprocessData(result);
                },
                (error) => {
                    jsonData = {error: error.toString()};
                }
            )
            .then(() => {
                this.setState({
                    orjData: jsonData,
                    mainData: jsonData,
                    loading: false
                });
                if (options.scrollToTop) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            })
    };

    render() {
        return (
            <div className="App">
                <Navbar getData={this.getData}/>
                <Headertabs
                    {...this.state}
                    updateParentState={this.updateParentState}
                    getData={this.getData}
                    flagImg={this.flagImg}
                />
                {/*<Main getData={this.getData} {...this.state}/>*/}
                <main className="main">
                    <Switch>
                        {/*<Route exact path='/' component={Homepage}/>*/}
                        <Route exact path='/' render={() => (
                            <Homepage
                                {...this.state}
                                updateParentState={this.updateParentState}
                                getData={this.getData}
                                flagImg={this.flagImg}
                            />
                        )}/>
                        <Route exact path='/test' render={() => (
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
