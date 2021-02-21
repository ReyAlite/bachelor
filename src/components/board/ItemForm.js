import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Collapse, Button} from 'react-bootstrap';
import '../../css/itemForm.css';

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
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
                date: Date.now(),
                meta: {
                    reports: 0
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
            <div className="d-flex flex-column">
                <Button
                    className="btn-sm btn-dark w-25 mt-3 mr-3 ml-auto"
                    href="#!"
                    onClick={() => this.props.action()}
                    aria-controls="item-form"
                    aria-expanded={this.props.isActive}
                >Neuer Beitrag</Button>
                <div className="w-75 ml-auto mr-auto mt-3">
                    <Collapse in={this.props.isActive}>
                        <div>
                            <span className="small">Teile deine Gedanken und Erfahrungen indem du einen Beitrag im Board veröffentlichst</span>
                            <form>
                                <input
                                    placeholder="Titel"
                                    className="form-input"
                                    type="text"
                                    onChange={e => this.handleTitleInput(e)}
                                    name="entry-title"
                                    value={this.state.title}
                                />
                                <textarea
                                    placeholder="Als ich damals..."
                                    className="form-input"
                                    type="text"
                                    onChange={e => this.handleBodyInput(e)}
                                    name="entry-title"
                                    value={this.state.body}
                                />
                                <button
                                    className="btn-sm btn-dark"
                                    onClick={e => this.addEntry(e)}
                                >Erstellen
                                </button>
                            </form>
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({
            author : window.sessionStorage.getItem('username')
        })
    }
}

export default ItemForm;