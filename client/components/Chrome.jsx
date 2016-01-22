import Radium from 'radium';
import React from 'react';

// Library Components
import AppBar from 'material-ui/lib/app-bar';

// My Components
import LeftMenu from '../components/LeftMenu.jsx';

// Default Styles
import appStyle from '../style/appStyle';

/**
 * Provides all the chrome around the application
 * @extends React.Component
 */
@Radium
export default class Chrome extends React.Component {
    /**
     * React property types
     * @type {Object}
     * @readonly
     */
    static propTypes = {
        // Child page to be provided by react-router
        children: React.PropTypes.node
    };

    /**
     * Radium Stylesheet
     * @type {Object}
     * @readonly
     */
    static stylesheet = {
        chrome: {
            display: 'flex',
            flexFlow: 'column nowrap',
            height: '100%',
            width: '100%'
        },
        appbar: {
            backgroundColor: appStyle.color1
        },
        error: {
            backgroundColor: appStyle.redback,
            color: '#FFFFFF',
            font: `1rem ${appStyle.fonts.sans}`,
            padding: '0.4rem 0',
            textAlign: 'center',
            width: '100%'
        },
        footer: {
            backgroundColor: appStyle.color5,
            display: 'block',
            textAlign: 'center'
        },
        footertext: {
            color: appStyle.trans8,
            font: `0.8rem ${appStyle.fonts.sans}`,
            margin: '0.5rem 0'
        },
        mainpage: {
            flexGrow: 1
        }
    };

    /**
     * Create a new component
     *
     * @param {Object} props the property values
     */
    constructor(props) {
        super(props);
        this.state = {
            leftMenu: {
                isOpen: false
            }
        };
    }

    /**
     * Event Handler - show or display the left menu
     * @param {bool} open if the left nav should be open or closed
     * @returns {bool} true if the event was handled
     */
    onManipulateLeftMenu(open) {
        this.setState({
            leftMenu: {
                isOpen: open
            }
        });
        return true;
    }

    /**
     * Render the component
     * @returns {JSX.Element} the rendered component
     * @overrides React.Component#render
     */
    render() {
        let errorIndicator = '';

        // Properties for the AppBar component
        let appbarOptions = {
            style: Chrome.stylesheet.appbar,
            title: 'Grumpy Wizards',
            onLeftIconButtonTouchTap: () => { return this.onManipulateLeftMenu(!this.state.leftMenu.open); }
        };

        // Properties for the LeftMenu component
        let leftMenuOptions = {
            open: this.state.leftMenu.isOpen,
            onRequestChange: (open) => { return this.onManipulateLeftMenu(open); }
        };

        return (
            <div style={Chrome.stylesheet.chrome}>
                {errorIndicator}
                <header>
                    <AppBar {...appbarOptions} />
                    <LeftMenu {...leftMenuOptions} />
                </header>
                <section style={Chrome.stylesheet.mainpage}>
                    {this.props.children}
                </section>
                <footer style={Chrome.stylesheet.footer}>
                    <h6 style={Chrome.stylesheet.footertext}>
                        {'Copyright \u00a9 2016 Adrian Hall'}
                    </h6>
                </footer>
            </div>
        );
    }
}
