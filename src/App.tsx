import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [foodQuery, setFoodQuery] = useState("");
  const [toBuy, setToBuy] = useState([foodQuery]);

  useEffect(() => {
    fetch(`https://api.frontendeval.com/fake/food/${foodQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }, [foodQuery]);

  function addGrocery(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setToBuy([...toBuy]);
  }

  // function handleChange(event: React.MouseEvent<HTMLElement>) {
  //   setToBuy(event.target.value);
  // }

  // function handleClick(event: React.MouseEvent<HTMLElement>) {
  //   event.preventDefault();
  // }

  return (
    <div className="container">
      <div className="title">
        <h1> My Shopping List</h1>
      </div>
      <form>
        <input
          type="text"
          value={foodQuery}
          list="item"
          onChange={(e) => setFoodQuery(e.target.value)}
        />
      </form>

      <div className="shopping-list">
        {/* <form onSubmit={addGrocery}> */}
        <datalist id="item">
          {searchResults.map((grocery, index) => (
            <select>
              {/* // <select onClick={addGrocery}> */}
              <option key={index}>{grocery}</option>
            </select>
          ))}
        </datalist>
        <button type="submit">Add Item</button>
        {/* </form> */}
      </div>
      <div className="to-buy-list">
        {toBuy.map((index) => (
          <ul>
            <div>
              <li key={index}>{foodQuery}</li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
