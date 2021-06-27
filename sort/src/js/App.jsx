import '../css/App.css';
import React from "react";
import FlipMove from "react-flip-move";
import NumbersBlock from "./NumbersBlock";

class App extends React.Component {
    constructor(props) {
        super(props);
        let array = [];
        for (let i = 0; i < props.length; i++)
            array.push(i);

        this.state = {
            array: array
        }
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sortArray() {
        let array = this.state.array;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    await this.timeout(1000);
                    this.setState({array: array});
                }
            }
        }
    }

    changeLengthArray() {
        let length = document.getElementById("array-length").value,
            newArray = this.state.array;
        newArray.splice(0, this.state.array.length);
        for (let i = 0; i < length; i++)
            newArray.push(i);
        this.setState({array: newArray});

        console.log(this.state.array);
    }

    shuffleArray() {
        let array = this.state.array;
        array.sort(() => Math.random() - 0.5);
        this.setState({array: array});

        console.log(this.state.array)
    }

    render() {
        return (
            <div className="App">
                <div>
                    <div className="Settings-form">
                        <label>Размерность вашего массива:
                            <input id="array-length" type="text" size="2"/></label>
                        <input type="submit" value="Изменить" onClick={this.changeLengthArray.bind(this)}/>
                        <input type="submit" value="Перемешать" onClick={this.shuffleArray.bind(this)}/>
                        <input type="submit" value="Сортировать" onClick={this.sortArray.bind(this)}/>
                    </div>
                </div>

                <div id="content" className="App-SetNumber">
                    <FlipMove typeName={null}>
                        {this.state.array.map(element => (
                            <NumbersBlock key={element} number={element}/>
                        ))}
                    </FlipMove>
                </div>
            </div>
        )
    };
}

export default App;
