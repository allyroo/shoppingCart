import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IGrocery } from "./Interfaces";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState<Array<string>>([]);
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [toBuyList, setToBuyList] = useState<IGrocery[]>([]);

  useEffect(() => {
    if (foodQuery) {
      fetch(`https://api.frontendeval.com/fake/food/${foodQuery}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    }
  }, [foodQuery]);

  function addGrocery(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const addItem = { foodQuery: foodQuery, isFound: false };
    setToBuyList([...toBuyList, addItem]);
    setFoodQuery("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFoodQuery(event.target.value);
  }

  function deleteGrocery(deleteGroceryItem: string) {
    setToBuyList(
      toBuyList.filter((item) => item.foodQuery !== deleteGroceryItem)
    );
  }

  function handleToggle(index: number) {
    const updatedToBuyList = [...toBuyList];
    updatedToBuyList[index].isFound = !updatedToBuyList[index].isFound;
    setToBuyList(updatedToBuyList);
  }

  return (
    <div className="container">
      <div className="title">
        <h1> My Shopping List</h1>
      </div>

      <form className="search">
        <input
          type="text"
          value={foodQuery}
          list="item"
          onChange={handleChange}
        />
        <button className="addGroceryButton" onClick={addGrocery}>
          Add Item
        </button>
      </form>

      <div className="shopping-list">
        <datalist id="item">
          {searchResults.map((grocery: string, index: number) => (
            <select key={index}>
              <option>{grocery}</option>
            </select>
          ))}
        </datalist>
      </div>

      <div className="to-buy-list">
        <ul className="list-items">
          {toBuyList.map((grocery: IGrocery, index: number) => {
            return (
              <div className="grocery-list" key={index}>
                <div className="grocery-item">
                  <input
                    type="checkbox"
                    onClick={() => handleToggle(index)}
                    className="checkbox"
                    id="itemFound"
                  />

                  <li
                    id="itemFound"
                    className={grocery.isFound ? "item-found" : "item-to-seek"}
                    key={index}
                  >
                    {grocery.foodQuery}
                  </li>
                </div>

                <button
                  className="deleteButton"
                  onClick={() => deleteGrocery(grocery.foodQuery)}
                >
                  x
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
