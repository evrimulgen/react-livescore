import React, {Component} from 'react';
import SportRow from "./SportRow";
import Errors from "./Errors";
import Loading from "./Loading";

class Homepage extends Component {


    componentDidMount() {
        this.props.getData({
            api: '/football//2018-10-03/json',
            data: null,
            scrollToTop: false
        });
    }

    render() {
        const dataObj = this.props.mainData;
        let mainContent = [];

        if(dataObj) {
            if (typeof dataObj.status !== "undefined" && dataObj.status !== "200") {
                mainContent.push(<Errors key={1} type="error" message="Error" status={dataObj.status}/>);
            } else {
                if (dataObj.sportItem) {
                    mainContent.push(<SportRow key={1} data={dataObj}/>)
                } else if (dataObj.liveList) {
                    mainContent.push(<Errors key={1} type="no-live-game"/>)
                }
            }
        }
        return (
            <div>
                {this.props.loading ? <Loading/> : null}
                <div className="container pb-4 px-0">
                    <div>
                        {mainContent}
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
