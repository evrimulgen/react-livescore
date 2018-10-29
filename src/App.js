import React, {Component} from 'react';
import './assets/style/app.scss';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import {Route, Switch} from "react-router-dom";
import TestComp from "./components/TestComp";
import Headertabs from "./components/Headertabs";
import $ from "jquery";
import moment from "moment";

class App extends Component {
    resetState;

    constructor(props) {
        super(props);
        this.state = {
            mainData: null,
            loading: false,
            orjData: null
        };
        this.updateParentState = this.updateParentState.bind(this);
        this.getData = this.getData.bind(this);
    }

    updateParentState = state => {
        this.setState(state);
    };
    sportItem;
    tournament;
    startTimestamp;

    flagImg(tournament) {
        let uniqueTournamentImages = [7, 8, 11, 384, 480, 679];
        if (uniqueTournamentImages.indexOf(tournament.tournament.uniqueId) > -1) {
            return (
                <div className="col flag-img">
                    <img src={"/static/media/" + tournament.tournament.uniqueId + ".png"}
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
        // Custom Sorting - Move some tournaments to the top of the list (FYI: 62 = Turkey, Super Lig)
        let moveToTop = [62]; // list the tournament Id's in order, i.e: [62, 36, 33]
        let tournaments = data.sportItem.tournaments;
        for (let i = 0; i < tournaments.length; i++) {
            for (let k = 0; k < moveToTop.length; k++) {
                if (tournaments[i].tournament.id === moveToTop[k]) {
                    let a = tournaments.splice(i, 1); // removes the item
                    tournaments.unshift(a[0]); // adds it back to the beginning
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
        this.setState({
            loading: true
        });

        let jsonData = {};
        $.ajax({
            url: 'https://www.sofascore.com' + options.api,
            data: options.data,
            cache: false
        }).done((data) => {
            jsonData = this.preprocessData(data);
        }).fail((xhr) => {
            jsonData.status = xhr.status;
        }).always(() => {
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
        });
    };

    render() {
        return (
            <div className="App">
                <Navbar getData={this.getData}/>
                <Headertabs
                    {...this.state}
                    updateParentState={this.updateParentState}
                    getData={this.getData}
                    resetState={this.resetState}
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
