import { evaluate } from "mathjs";
import { useState } from "react";

export const numbers = [0, 1, 2, 3, 4, 5, 6];
const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
export const operations = ["+", "-", "*", "/"];
export const equalSign = "=";

export const Calculator = () => {
  const [value, setValue] = useState("");

  const createHandleClick = (op) => setValue(value.toString().concat(op));
  return (
    <section>
      <h1>Calculator</h1>
      <input type="text" value={value} readOnly />
      <div role="grid">
        {rows.map((row, index) => (
          <div role="row" key={index}>
            {row.map((number) => (
              <button onClick={() => createHandleClick(number)} key={number}>
                {number}
              </button>
            ))}
          </div>
        ))}
        {operations.map((operation) => (
          <button onClick={() => createHandleClick(operation)} key={operation}>
            {operation}
          </button>
        ))}
        <button
          onClick={() => {
            setValue(evaluate(value));
            console.log(value);
          }}
        >
          {equalSign}
        </button>
      </div>
    </section>
  );
};
