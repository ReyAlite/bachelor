import React, {Component} from 'react';
import Navigation from '../Navigation';
import ItemForm from './ItemForm';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/board.css"
import Header from '../Header';

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsActive: false,
            data: []
        }
        this.handleActiveModal = this.handleActiveModal.bind(this)
    }

    handleActiveModal() {
        this.setState({modalIsActive: !this.state.modalIsActive})
    }

    getEntryList = () => {
        const {data} = this.state;
        return data.map((entry) => {
            return (
                <div key={entry._id}
                className="bg-light m-3">
                    <p className="p-2 font-weight-bold">{entry.title}</p>
                    <p className="p-2">{entry.body}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="d-flex flex-column">
                <Header name="Board"/>
                <div className="board-container">
                    <p>Das Board</p>
                    <ItemForm
                        action={this.handleActiveModal}
                        isActive={this.state.modalIsActive}/>
                </div>
                {this.getEntryList()}
            </div>
        );
    }

    componentDidMount() {
        fetch('/api/entries')
            .then(res => {
                res.json()
                    .then(data =>
                        this.setState({
                            data: data
                        }))
            })
            .catch(err => console.log(err))
    }
}


export default Board;