import React, {Component} from 'react';
import ItemForm from './ItemForm';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../Header';
import BoardItem from './BoardItem';

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
        const sortedData = data.sort((a,b) => a.date - b.date);
        console.log(data)
        console.log(sortedData)
        return sortedData.map((entry) => {
            return <BoardItem key={entry._id} data={entry}/>
        });
    }

    render() {
        return (
            <div className="w-50 ml-auto mr-auto mt-3 d-flex flex-column">
                <Header name="Board"/>
                <div className="bg-white mt-3 border rounded">
                    <ItemForm
                        action={this.handleActiveModal}
                        isActive={this.state.modalIsActive}/>
                    {this.getEntryList()}
                </div>
            </div>
        );
    }

    fetchData = () => {
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

    componentDidMount() {
        this.fetchData()
    }
}


export default Board;