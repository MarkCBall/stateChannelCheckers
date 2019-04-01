import React, { Component } from "react";

class LabelAndInput extends Component {
    getTextInputClass = () => {
        if (this.props.isGreen)
            return "form-control float-left is-valid"
        return "form-control float-left is-invalid"
    }

    render() {

        return (
            <>
                <div className={this.props.labelWidthClass}>
                    <label className="float-right">{this.props.label}</label>
                </div>
                <div className={this.props.textWidthClass}>
                    <input
                        className={this.getTextInputClass()}
                        type="text"
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </div>
            </>
        )
    }
}

export default LabelAndInput
