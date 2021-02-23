import React, {Component} from 'react';

class BoardItem extends Component {
    data = this.props.data;

    handleReport = (e) => {
        const userId = window.sessionStorage.getItem("userId");
        const entryId = e.target.getAttribute('id');
        console.log("user: " + userId, "entry: " + entryId)
        fetch(`http://localhost:4000/api/entries/${entryId}`,{
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                userId : userId
            })
        })
            .then(res => console.log(res.json()))
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="bg-light m-3 d-flex flex-column border rounded">
                <div className="d-flex">
                    <span className="pl-2 pt-2 font-weight-bold">{this.data.title}</span>
                    <span className="pr-2 pt-2 small ml-auto">{new Date(this.data.date).toDateString()}</span>
                </div>
                <span className="pl-2 small">{this.data.author}</span>
                <p className="p-2 small">{this.data.body}</p>
                <span
                    id={this.props.data._id}
                    onClick={this.handleReport}
                >!!!</span>
            </div>
        );
    }
}

export default BoardItem;