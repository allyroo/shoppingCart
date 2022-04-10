import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IGrocery } from "./Interfaces";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState<Array<string>>([]);
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [toBuyList, setToBuyList] = useState<IGrocery[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (foodQuery) {
      fetch(`https://api.frontendeval.com/fake/food/${foodQuery}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    }
  }, [foodQuery]);

  function addGrocery(event: MouseEvent<HTMLButtonElement>): void {
    if (!foodQuery) {
      alert("Please input item");
    } else {
      event.preventDefault();
      const addItem = {
        groceryItem: foodQuery,
        isFound: false,
        groceryQuantity: quantity,
      };
      setToBuyList([...toBuyList, addItem]);
      setFoodQuery("");
      setQuantity(1);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setFoodQuery(event.target.value);
  }

  function handleIncrease(event: MouseEvent<HTMLButtonElement>): void {
    setQuantity(quantity + 1);
    event.preventDefault();
  }

  function handleDecrease(event: MouseEvent<HTMLButtonElement>): void {
    if (quantity < 1) {
      alert("Quantity cannot be less than one!");
    } else {
      setQuantity(quantity - 1);
      event.preventDefault();
    }
  }

  function deleteGrocery(deleteGroceryItem: string): void {
    setToBuyList(
      toBuyList.filter((item) => item.groceryItem !== deleteGroceryItem)
    );
  }

  function handleToggle(index: number): void {
    const updatedToBuyList = [...toBuyList];
    updatedToBuyList[index].isFound = !updatedToBuyList[index].isFound;
    setToBuyList(updatedToBuyList);
  }

  function handleDropDown(): void {
    if (foodQuery) setSearchResults([]);
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
        <label htmlFor="quantity">
          <button onClick={handleDecrease}>-</button>
          <span className="how-much">{quantity}</span>

          <button onClick={handleIncrease}>+</button>
        </label>

        <button className="addGroceryButton" onClick={addGrocery}>
          Add Item
        </button>
      </form>

      <div className="shopping-list">
        <datalist id="item">
          {searchResults.map((grocery: string, index: number) => (
            <select onClick={handleDropDown} key={index}>
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
                    {grocery.groceryItem}
                  </li>
                  <span className="quantity">(x{grocery.groceryQuantity})</span>
                </div>

                <button
                  className="deleteButton"
                  onClick={() => deleteGrocery(grocery.groceryItem)}
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
