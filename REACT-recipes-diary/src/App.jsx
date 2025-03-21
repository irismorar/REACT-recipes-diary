import { useState } from "react";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  return (
    <section className="main_container">
      <h1>Welcome to my yummy diary!</h1>
      <div className="input_container">
        <input
          type="text"
          placeholder="Type ingredients..."
          value={userInput}
          onChange={(event) => {
            if (!event.target.value.trim()) {
              alert(
                "Quantity must have numbers and Ingredients must have letters!"
              );
              return;
            }
            setUserInput(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            const newState = [
              ...recipes,
              { id: Date.now(), title: userInput, added: false },
            ];
            setRecipes(newState);
            setUserInput("");
          }}
        >
          Add
        </button>
      </div>

      <div className="current_recipe_container">
        <h3>New recipe</h3>
        <ul className="current_recipe">
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <input
                  type="checkbox"
                  checked={recipe.added}
                  onChange={() => {
                    const updatedRecipe = recipes.map((item) =>
                      item.id === recipe.id
                        ? { ...item, added: !item.added }
                        : item
                    );
                    setRecipes(updatedRecipe);
                  }}
                />
                <label
                  style={{
                    textDecoration: recipe.added ? "line-through" : "none",
                  }}
                >
                  {recipe.title}
                </label>
                <button
                  className="button_delete_ingredient"
                  onClick={() => {
                    const afterDeleteIngredient = recipes.filter(
                      (item) => item.id !== recipe.id
                    );
                    setRecipes(afterDeleteIngredient);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <button className="button_save_recipe">Save Recipe</button>
      </div>
    </section>
  );
}
