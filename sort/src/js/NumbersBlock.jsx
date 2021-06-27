import '../css/NumberBlock.css';
import React from "react";

class NumbersBlock extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            number: props.number
        }
    }

    render() {
        return (
            <div className="NumberBlock-div">
                <p className="NumberBlock-p">{this.state.number}</p>
            </div>
        )
    }
}

export default NumbersBlock;