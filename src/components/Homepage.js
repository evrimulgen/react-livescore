import React, {Component} from 'react';
import Tournament from "./Tournament";
import Errors from "./Errors";
import Loading from "./Loading";
import moment from "moment";

class Homepage extends Component {

    componentDidMount() {
        let todaysDate = moment().format('YYYY-MM-DD');
        this.props.getData({
            api: '/football//' + todaysDate + '/json',
            loading: true
        });

        // retrieve fresh data in every 10 seconds without displaying loading
        setInterval(()=>{
            this.props.getData({
                api: '/football//' + todaysDate + '/json',
                loading: false
            });
        }, 4000);
    }

    render() {
        const dataObj = this.props.mainData;
        let mainContent = [];

        if (dataObj) {
            if (typeof dataObj.status !== "undefined" && dataObj.status !== "200") {
                mainContent.push(<Errors key={1} type="error" message="Error" status={dataObj.status}/>);
            } else {
                if (dataObj.sportItem) {
                    mainContent.push(<Tournament key={1} data={dataObj} {...this.props}/>)
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
