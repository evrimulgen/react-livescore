import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="text-center">
                    <p>
                        <code>
                            Built with React by Mustafa Cakir<br/>(mc@flexiblewebdesign.com)
                        </code>
                    </p>
                    <p>
                        This app has no commercial intents.<br />Developed just for fun ;)
                    </p>
                    <small className="gray">Copyright © 2018</small>
                </footer>
            </div>
        )
    }
}

export default Footer
