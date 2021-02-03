import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Collapse} from 'react-bootstrap';

class ItemForm extends Component {
    render() {
        return (
            <div className="">
                <a
                    href="#!"
                    onClick={() => this.props.action()}
                    aria-controls="item-form"
                    aria-expanded={this.props.isActive}
                >
                    click
                </a>
                <Collapse in={this.props.isActive}>
                    <div id="item-form">
                       <input/>
                       <input/>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ItemForm;