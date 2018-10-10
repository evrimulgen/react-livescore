import React, {Component} from 'react';
import $ from "jquery";
import SportRow from "./SportRow";
import Errors from "./Errors";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainContent: null,
            loading: false
        };
    }

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

    componentDidMount() {
        this.props.getData({
            api: '/football//2018-10-10/json',
            data: null
        });

        this.props.updateParentState({
            mainContent: 'heyooo',
            loading: true
        });
    }

    render() {
        return this.props.mainContent;
    }
}

export default Homepage
