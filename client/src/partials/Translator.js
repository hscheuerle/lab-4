import React, { Component } from "react";
import LangOptions from "../components/LangOptions";

export default class Translator extends Component {
    state = {
        // TODO need to lift state from langoptions
        origin: "english",
        destination: "english",
        source: "",
        result: "",
        options: []
    };
    componentDidMount = () => {
        fetch("/options").then(res => {
            res.json().then(json => {
                const { options } = json;
                this.setState({ options });
            });
        });
    };

    render() {
        const { options, source, result } = this.state;
        console.log(options);

        return (
            <div>
                <h4>Translator Partial</h4>
                <LangOptions onValues={this.onValues} options={options} />
                <textarea value={source} onChange={this.handleChange} />
                <textarea value={result} />
                <button onClick={this.handleClick}>translate</button>
            </div>
        );
    }
    onValues = values => {
        const { origin, destination } = values;
        if (origin) this.setState({ origin });
        else if (destination) this.setState({ destination });
    };
    handleChange = ev => {
        const { value } = ev.target;
        this.setState({ source: value });
    };
    handleClick = () => {
        const { origin, destination, source } = this.state;
        fetch("/get-translation", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ origin, destination, source })
        })
            .then(res => res.text())
            .then(text => {
                this.setState({ result: text });
            });
    };
}
