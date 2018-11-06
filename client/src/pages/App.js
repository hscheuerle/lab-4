import React, { Component } from "react";
import "./App.css";
import Updater from "../components/Updater";

class App extends Component {
    constructor() {
        super();

        this.state = {
            origin: "english",
            translation: "italian",
            textarea: "",
            response: ""
        };
    }
    render() {
        const { textarea, response } = this.state;

        return (
            <main className="full">
                <Updater/>
                <article className="center middle">
                    <section className="box border">
                        <select name="origin" onChange={this.handleSelect}>
                            <option value="english">english</option>
                        </select>
                        <textarea value={textarea} onChange={this.handleChange} />
                    </section>
                    <section className="box">
                        <select name="translation" onChange={this.handleSelect}>
                            <option value="italian">italian</option>
                            <option value="placeholder">placeholder</option>
                            <option value="placeholder">placeholder</option>
                        </select>
                        <textarea value={response} />
                    </section>
                </article>
            </main>
        );
    }
    handleSelect = ev => {
        const { name, value } = ev.target;
        this.setState({ [name]: value })
    }
    handleChange = ev => {
        const { value } = ev.target;
        this.setState({ textarea: value });
        const { origin, translation } = this.state;
        fetch("/translation", {
            method: 'post',
            body: JSON.stringify({ origin, translation, textarea: value }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                const { found } = res;
                console.log(found)
                this.setState({ response: found });
            }).catch(reason => {
                console.log(reason);
            });
    };
}

export default App;
