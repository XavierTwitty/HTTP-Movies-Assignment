import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
};

const AddForm = (props) => {
  const [item, setItem] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, item)
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);

        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />

        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />

        <button> add </button>
      </form>
    </div>
  );
};
export default AddForm;
