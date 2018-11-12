import React, { Component } from "react";
import FileInputToText from "../components/FileInputToText";

class Dictionary extends Component {
    state = {
        origin: "",
        destination: "",
        dictionary: ""
    };

    render() {
        const { origin, destination } = this.state;
        return (
            <div>
                <h4>Dictionary Partial</h4>
                <fieldset>
                    <input
                        name="origin"
                        value={origin}
                        onChange={this.handleChange}
                    />
                    <input
                        name="destination"
                        value={destination}
                        onChange={this.handleChange}
                    />
                    <FileInputToText onText={this.handleText} />
                    <button onClick={this.handleClick}>upload</button>
                </fieldset>
            </div>
        );
    }
    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    };
    handleText = dictionary => {
        this.setState({ dictionary });
    };
    handleClick = () => {
        const { origin, destination, dictionary } = this.state;
        fetch("/dictionary-update", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                origin,
                destination,
                dictionary
            })
        }); // test from here!
    };
}

export default Dictionary;
