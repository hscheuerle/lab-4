import React, { Component } from "react";
import Dictionary from "../partials/Dictionary";
import Translator from "../partials/Translator";

class Landing extends Component {
    render() {
        return (
            <div>
                <Dictionary/>
                <Translator/>
            </div>
        );
    }
}

export default Landing;
