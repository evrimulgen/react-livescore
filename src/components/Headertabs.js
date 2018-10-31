import React, {Component} from 'react';
import Icon from "./Icon";
import {cloneDeep} from "lodash";

class Headertabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFilterDropdown: false,
            isFilterSelected: false,
            filteredItems: [],
            isLive: false,
            isSportDropdown: false,
        };
        this.toggleLive = this.toggleLive.bind(this);
        this.openFilterDropdown = this.openFilterDropdown.bind(this);
        this.openSportDropdown = this.openSportDropdown.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.filterItemClickHandler = this.filterItemClickHandler.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentDidMount () {
        const persistState = sessionStorage.getItem('HeadertabsState');
        if (persistState) {
            try {
                this.setState(JSON.parse(persistState));
            } catch (e) {
                // is not json
            }
        }
    }

    componentWillUnmount () {
        sessionStorage.set('HeadertabsState', JSON.stringify(this.state));
    }

    clearFilter() {
        this.setState({
            filteredItems: [],
            isFilterDropdown: false,
            isFilterSelected: false,
            isLive: false
        });
        this.props.updateParentState({
            mainData: this.props.orjData
        });
    }

    applyFilter() {
        this.setState({
            isFilterDropdown: false,
            isFilterSelected: this.state.filteredItems.length > 0
        });
        if (this.state.filteredItems.length > 0) {
            let LiveMatches = cloneDeep(this.props.orjData);
            LiveMatches.sportItem.tournaments = LiveMatches.sportItem.tournaments.filter((tournament) => {
                return this.state.filteredItems.indexOf(tournament.tournament.id) > -1
            });
            this.props.updateParentState({
                mainData: LiveMatches
            });
            this.setState({
                isLive: false
            })
        } else {
            this.clearFilter();
        }
    }

    filterItemClickHandler(el) {
        let item = el.currentTarget;
        item.classList.toggle('checked');

        let newfilteredItems = [...this.state.filteredItems],
            id = parseInt(el.currentTarget.getAttribute('data-id'));

        if (newfilteredItems.indexOf(id) === -1) {
            newfilteredItems.push(id);
        } else {
            newfilteredItems = newfilteredItems.filter(x => x !== id);
        }
        this.setState({filteredItems: newfilteredItems});
    }


    toggleLive(status) {
        this.setState({isFilterDropdown: false});
        this.setState({isSportDropdown: false});
        if (status === false) {
            let LiveMatches = cloneDeep(this.props.mainData);
            LiveMatches.sportItem.tournaments = LiveMatches.sportItem.tournaments.reduce(function (whole, tournament) {
                tournament.events = tournament.events.filter((event) => {
                    return event.status.type === "inprogress";
                });
                tournament.events.forEach(() => {
                    if (whole.indexOf(tournament) < 0) whole.push(tournament);
                });
                return whole;
            }, []);
            this.props.updateParentState({
                mainData: LiveMatches
            });
        } else {
            if (this.state.filteredItems.length > 0) {
                this.applyFilter();
            } else {
                this.props.updateParentState({
                    mainData: this.props.orjData
                });
            }
        }
        this.setState({isLive: !this.state.isLive}, () => {
            sessionStorage.setItem('HeadertabsState', JSON.stringify(this.state));
        });
    }

    openFilterDropdown() {
        this.setState({isFilterDropdown: !this.state.isFilterDropdown});
        this.setState({isSportDropdown: false});
    }

    openSportDropdown() {
        this.setState({isSportDropdown: !this.state.isSportDropdown});
        this.setState({isFilterDropdown: false});
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
                    <div className="header-tabs-container justify-content-center"
                         onClick={this.toggleLive.bind(null, this.state.isLive)}>
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
                        <div className="list-container">
                        {this.state.isFilterDropdown ? <FilterItems filterItemClickHandler={this.filterItemClickHandler} {...this.props} {...this.state}/> : ''}
                        </div>
                        <div className="confirm-container row m-0">
                            <div className="col filter-btn filter-okay" onClick={this.applyFilter}>
                                Apply (<strong>{this.state.filteredItems.length}</strong>)
                            </div>
                            <div className="col filter-btn filter-clear" onClick={this.clearFilter}>
                                Clear
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

const FilterItems = props => {
    let FilterItems = [];
    if (props.orjData) {
        props.orjData.sportItem.tournaments.forEach((tournament, i) => {
            FilterItems.push(
                <div key={i}>
                    <div className={"dropdown-item" + (props.filteredItems.indexOf(tournament.tournament.id) > -1 ? " checked" : "")} data-id={tournament.tournament.id}
                         onClick={props.filterItemClickHandler}>
                        <span className="checkbox"/>
                        {props.flagImg(tournament)}
                        <div className="col tournament-name px-2">
                            <strong>{tournament.category.name}</strong> - {tournament.tournament.name}</div>
                    </div>
                    <hr className="separator"/>
                </div>
            )
        });
    }
    return FilterItems;

};

export default Headertabs
