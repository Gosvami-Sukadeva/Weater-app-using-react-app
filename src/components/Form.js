import React from "react";

const Form = (props) => {
  return (
    <form>
      <input
        type="text"
        value={props.value}
        placeholder="wpisz miasto"
        onChange={props.change}
      />
    </form>
  );
};

export default Form;
