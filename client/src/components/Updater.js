import React, { Component } from "react";
import FileInputToText from "./FileInputToText";

class Updater extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: "",
            translation: ""
        };
    }
    render() {
        const { origin, translation } = this.state;
        return (
            <div>
                <input name="origin" value={origin} onChange={this.onChange} />
                <input
                    name="translation"
                    value={translation}
                    onChange={this.onChange}
                />
                <FileInputToText onText={this.postText} />
            </div>
        );
    }
    onChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    };
    postText = textinput => {
        const { origin, translation } = this.state;
        fetch("/update", {
            method: "post",
            body: JSON.stringify({ origin, translation, textinput }), // need stringify?
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.update);
            })
            .catch(reason => console.log(reason));
    };
}

export default Updater;
