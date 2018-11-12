import React, { Component } from "react";

/**
 * picker for the imported dictionary
 */
class LangOptions extends Component {
    render() {
        const { options } = this.props;
        return (
            <div className="LangOptions">
                <LangOption
                    name="origin"
                    options={options}
                    onValue={this.onValue}
                />
                {/* TODO make second options the minus of the first value, how to get value?*/}
                <LangOption
                    name="destination"
                    options={options}
                    onValue={this.onValue}
                />
            </div>
        );
    }
    onValue = (name, value) => {
        const { onValues } = this.props;
        onValues({[name]: value})
    };
}

class LangOption extends Component {
    render = () => {
        const { name, options } = this.props;

        return (
            <select name={name} onChange={this.handleChange}>
                {options.map(option => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        );
    };
    handleChange = ev => {
        const { onValue } = this.props;
        const { name, value } = ev.target;
        onValue(name, value);
    };
}

export default LangOptions;
