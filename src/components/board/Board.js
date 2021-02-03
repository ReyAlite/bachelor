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
            modalIsActive : false
        }
        this.handleActiveModal = this.handleActiveModal.bind(this)
    }

    handleActiveModal (){
        this.setState({modalIsActive : !this.state.modalIsActive})
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
            </div>
        );
    }
}

export default Board;