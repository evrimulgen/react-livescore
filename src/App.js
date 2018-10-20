import React, {Component} from 'react';
import './assets/style/app.scss';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import { Switch , Route } from "react-router-dom";
import TestComp from "./components/TestComp";
import Headertabs from "./components/Headertabs";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainContent: null,
            loading: false
        };
    }

    // updateParentState = state => {
    //     this.setState(state);
    // };

    render() {
        return (
            <div className="App">
                <Navbar getData={this.getData}/>
                <Headertabs/>
                {/*<Main getData={this.getData} {...this.state}/>*/}
                <main className="main">
                    <Switch>

                        <Route exact path='/' component={Homepage}/>

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
