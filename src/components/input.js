import React, { useState } from "react";
import '../css/input.css'

function InputField(props){
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(inputValue);
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <>
            <form className="input-field" onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button type="submit">Get Weather</button>
            </form>
        </>
    )
}

export default InputField;