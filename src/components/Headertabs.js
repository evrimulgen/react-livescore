import React, {Component} from 'react';
import Icon from "./Icon";

class Headertabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFilterDropdown: false,
            isFilterSelected: false,
            filteredItems: [],
            isLive: false,
            isSportDropdown: false,
            mainContent: this.props.mainData
        };
        this.toggleLive = this.toggleLive.bind(this);
        this.openFilterDropdown = this.openFilterDropdown.bind(this);
        this.openSportDropdown = this.openSportDropdown.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.filterItemClickHandler = this.filterItemClickHandler.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentDidMount() {
        // code here...
    }
    clearFilter() {
        this.setState({
            filteredItems: [],
            isFilterDropdown: false,
            isFilterSelected: false
        });
        let checkEls = document.querySelectorAll('.filters .checked');
        checkEls.forEach(item => {
            item.classList.remove('checked');
        });
    }

    filterItemClickHandler(el) {
        let item = el.currentTarget;
        item.classList.toggle('checked');

        let newfilteredItems = [...this.state.filteredItems],
            id = el.currentTarget.getAttribute('data-id');

        if (newfilteredItems.indexOf(id) === -1) {
            newfilteredItems.push(id);
        } else {
            newfilteredItems = newfilteredItems.filter(x => x !== id);
        }
        this.setState({filteredItems: newfilteredItems});
        console.log(newfilteredItems);
    }

    applyFilter() {
        this.setState({
            isFilterDropdown: false,
            isFilterSelected: this.state.filteredItems.length > 0
        });
    }

    toggleLive() {
        if (this.state.isLive === false) {
            // let LiveMatches = this.props.mainData;
            // LiveMatches.sportItem.tournaments = LiveMatches.sportItem.tournaments.reduce(function( whole, item ) {
            //     item.events.forEach((event) => {
            //         console.log(event.status.type);
            //         if (event.status.type === "inprogress") {
            //             if (whole.indexOf(item) < 0) whole.push(item);
            //         }
            //     });
            //     return whole;
            // }, []);
            this.props.updateParentState({
                mainContent: "heyooo"
            })
        } else {
            console.log('disable live');
            this.props.updateParentState({
                mainContent: "heyoooo"
            })
        }
        this.setState({isLive: !this.state.isLive});
    }

    openFilterDropdown() {
        this.setState({isFilterDropdown: !this.state.isFilterDropdown});
    }

    openSportDropdown() {
        this.setState({isSportDropdown: !this.state.isSportDropdown});
        console.log(this.props.mainData.sportItem.tournaments);
    }

    render() {
        return (
            <ul className="header-tabs row">
                <li className="col p-0">
                    <div
                        className="header-tabs-container"
                        onClick={this.openSportDropdown.bind(this)}
                        tabIndex="0">
                        <Icon name="far fa-futbol mr-2"/>Futbol<Icon
                        name={"ml-2 fas fa-angle-" + (this.state.isSportDropdown ? 'up' : 'down')}/>
                    </div>
                    <div className={"dropdown-menu sports left" + (this.state.isSportDropdown ? ' show' : '')}
                         aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="/test"><Icon name={"far fa-futbol"}/> Futbol</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-basketball-ball"}/> Basketball</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-table-tennis"}/> Tennis</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-baseball-ball"}/> Baseball</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-football-ball"}/> Amr.
                            Football</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-football-ball"}/> Rugby</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-hockey-puck"}/> Hokey</a>
                        <hr className="separator"/>
                        <a className="dropdown-item" href="/test"><Icon name={"fas fa-volleyball-ball"}/> Voleyball</a>
                    </div>
                </li>

                <li className={"col col-live p-0" + (this.state.isLive ? ' active' : '')}>
                    <div className="header-tabs-container justify-content-center" onClick={this.toggleLive}>
                        <Icon name="far fa-clock mr-1"/> Live
                    </div>
                </li>
                <li className="col col-date p-0">
                    <div className="header-tabs-container justify-content-center">
                        Today <Icon name="ml-1 fas fa-angle-down"/>
                    </div>
                </li>
                <li className={"col col-filter p-0" + (this.state.isFilterSelected ? ' active' : '')}>
                    <div className="header-tabs-container justify-content-center"
                         onClick={this.openFilterDropdown.bind(this)}>
                        <Icon name="ml-1 fas fa-filter"/>
                    </div>
                    <div className={"dropdown-menu filters right" + (this.state.isFilterDropdown ? ' show' : '')}
                         aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item" data-id="1234" onClick={this.filterItemClickHandler.bind(this)}>
                            <span className="checkbox"/>
                            <div className="col flag flag-england"/>
                            <div className="col tournament-name px-2"><strong>England</strong> - EFL Cup</div>
                        </div>
                        <hr className="separator"/>
                        <div className="dropdown-item" data-id="352" onClick={this.filterItemClickHandler.bind(this)}>
                            <span className="checkbox"/>
                            <div className="col flag-img"><img src="/static/media/7.png"
                                                               alt="UEFA Champions League, Group D"/></div>
                            <div className="col tournament-name px-2"><strong>Europe</strong> - UEFA Champions League,
                                Group D
                            </div>
                        </div>
                        <hr className="separator"/>
                        <div className="dropdown-item" data-id="4564" onClick={this.filterItemClickHandler.bind(this)}>
                            <span className="checkbox"/>
                            <div className="col flag flag-france"></div>
                            <div className="col tournament-name px-2"><strong>France</strong> - Ligue 2</div>

                        </div>
                        <hr className="separator"/>
                        <div className="dropdown-item" data-id="6879" onClick={this.filterItemClickHandler.bind(this)}>
                            <span className="checkbox"/>
                            <div className="col flag flag-brazil"></div>
                            <div className="col tournament-name px-2"><strong>Brazil</strong> - Brasileiro Série B
                            </div>
                        </div>
                        <hr className="separator"/>
                        <div className="dropdown-item" data-id="8976" onClick={this.filterItemClickHandler.bind(this)}>
                            <span className="checkbox"/>
                            <div className="col flag flag-peru"></div>
                            <div className="col tournament-name px-2"><strong>Peru</strong> - Primera Division,
                                Clausura
                            </div>
                        </div>
                        <hr className="separator"/>
                        <div className="row m-0">
                            <div className="col filter-okay" onClick={this.applyFilter}>
                                Confirm Filter (<strong>{this.state.filteredItems.length}</strong>)
                            </div>
                            <div className="col filter-clear" onClick={this.clearFilter}>
                                Clear
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

export default Headertabs
