import React, {Component} from 'react';

class BoardItem extends Component {
    data = this.props.data;

    render() {
        return (
            <div className="bg-light m-3 d-flex flex-column border rounded">
                <div className="d-flex">
                    <span className="pl-2 pt-2 font-weight-bold">{this.data.title}</span>
                    <span className="pr-2 pt-2 small ml-auto">{new Date(this.data.date).toDateString()}</span>
                </div>
                <span className="pl-2 small">{this.data.author}</span>
                <p className="p-2 small">{this.data.body}</p>
            </div>
        );
    }
}

export default BoardItem;