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
            data: [],
            update: 0
        }
        this.handleActiveModal = this.handleActiveModal.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleActiveModal() {
        this.setState({modalIsActive: !this.state.modalIsActive})
    }

    handleUpdate(){
        let num = this.state.update
        num++
        this.setState({update: num})
    }

    generateEntryList = () => {
        const {data} = this.state;
        return data.map((entry) => {
            return <BoardItem key={entry._id} data={entry}/>
        });
    }

    render() {
        return (
            <div className="w-50 ml-auto mr-auto mt-3 d-flex flex-column">
                <Header name="Board"/>
                <div className="bg-white mt-3 border rounded">
                    <ItemForm
                        handleActiveModal={this.handleActiveModal}
                        handleUpdate={this.handleUpdate}
                        isActive={this.state.modalIsActive}/>
                    {this.generateEntryList()}
                </div>
            </div>
        );
    }

    fetchData = () => {
        fetch('http://localhost:4000/api/entries')
            .then(res => {
                res.json()
                    .then(data => {
                        console.log(data)
                        this.setState({
                            data: data
                        })
                    })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchData()
    }
}


export default Board;