import React, {Component} from 'react';
import Navigation from './Navigation';

class Header extends Component {
    render() {
        return (
            <div className="d-flex">
                <h2>{this.props.name}</h2>
                <Navigation/>
            </div>
        );
    }
}

export default Header;