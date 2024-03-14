import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("<App/>", () => {
  test("should search and get movies", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();

    const titleFilter = screen.getByRole("checkbox");
    expect(titleFilter).toBeDefined();

    const form = screen.getByRole("form");
    expect(form).toBeDefined();

    const button = form.querySelector("button");
    expect(button).toBeDefined();
    
    await user.type(input, "avengers");
    await user.click(button);

    const list = screen.findAllByRole('list')
    expect(list).toBeDefined()

    const movies = await screen.findAllByRole("listitem")
    expect(movies.length).toBeGreaterThan(0);

    movies.forEach((movie) => {
      const title = movie.querySelector("h3").textContent.toLowerCase();
      const searchTerm = "avengers"; 
      expect(title).toContain(searchTerm);
    });

  });
});


