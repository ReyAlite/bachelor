import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Collapse} from 'react-bootstrap';

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: 'currentUser',
            title: '',
            body: ''
        }
    }

    addEntry = (e) => {
        e.preventDefault();
        if (this.state.title.length && this.state.body.length > 0) {
            const formData = {
                title: this.state.title,
                body: this.state.body,
                author: this.state.author,
                date : Date.now(),
                meta : {
                    reports : 0
                }
            }
            fetch('http://localhost:4000/api/entries', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    handleTitleInput = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleBodyInput = (e) => {
        this.setState({
            body: e.target.value
        })
    }

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
                    <form>
                        <input
                            type="text"
                            onChange={e => this.handleTitleInput(e)}
                            name="entry-title"
                            value={this.state.title}
                        />
                        <input
                            type="text"
                            onChange={e => this.handleBodyInput(e)}
                            name="entry-title"
                            value={this.state.body}
                        />
                        <button
                            onClick={e => this.addEntry(e)}
                        >Erstellen
                        </button>
                    </form>
                </Collapse>
            </div>
        );
    }
}

export default ItemForm;