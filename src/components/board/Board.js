import React, {Component} from 'react';
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
        console.log(data)
        return data.map((entry) => {
            return (
                <div key={entry._id} className="bg-light m-3 d-flex flex-column">
                    <div className="d-flex">
                        <span className="p-2 font-weight-bold">{entry.title}</span>
                        <span className="p-2 small ml-auto">{new Date(entry.date).toDateString()}</span>
                    </div>
                    <span className="small">{entry.author}</span>
                    <p className="p-2">{entry.body}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="w-50 m-auto d-flex flex-column">
                <Header name="Board"/>
                <div className="board-container">
                    <p>Das Board</p>
                    <ItemForm
                        action={this.handleActiveModal}
                        isActive={this.state.modalIsActive}/>
                    {this.getEntryList()}
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/entries')
            .then(res => {
                res.json()
                    .then(data => {
                        this.setState({
                            data: data
                        })
                        console.log(data)
                    })
            })
            .catch(err => console.log(err))
    }
}


export default Board;