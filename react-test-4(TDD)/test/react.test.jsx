import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { afterEach, describe, it, expect } from "vitest";
import { Calculator, equalSign, numbers, operations } from "../src/Calculator";

describe("Calculator", () => {
  afterEach(cleanup);
  const user = userEvent.setup();

  it("should render", () => {
    render(<Calculator />);
  });

  it("should render title correctly", () => {
    render(<Calculator />);

    screen.getByText("Calculator");
  });

  it("should render numbers", () => {
    render(<Calculator />);

    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  it("should render 4 rows", () => {
    render(<Calculator />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("should render operations", () => {
    render(<Calculator />);

    operations.forEach((operation) => {
      screen.getByText(operation);
    });
  });

  it("should render equal sign", () => {
    render(<Calculator />);

    screen.getByText("=");
  });

  it("should render an input", () => {
    render(<Calculator />);

    screen.getByRole("textbox");
  });

  it("should user input after clicking a number", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    await user.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toEqual("1");
  });

  it("should user input after clicking several numbers", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    await user.click(one);

    const two = screen.getByText("2");
    await user.click(two);

    const three = screen.getByText("3");
    await user.click(three);

    const input = screen.getByRole("textbox");
    expect(input.value).toEqual("123");
  });

  it("should show user input after clicking numbers and operations", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    await user.click(one);

    const plus = screen.getByText("+");
    await user.click(plus);
    await user.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toEqual("1+1");
  });

  it("should calculate based on user input and show the calculation", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    await user.click(one);

    const plus = screen.getByText("+");
    await user.click(plus);

    await user.click(one);

    const equal = screen.getByText(equalSign);
    await user.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");
  });

  it("should do an operation with the result of a previous one and show the calculation", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    await user.click(one);

    const plus = screen.getByText("+");
    await user.click(plus);

    await user.click(one);

    const equal = screen.getByText(equalSign);
    await user.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    await user.click(plus);
    await user.click(one);
    await user.click(equal);
    
    expect(input.value).toBe("3");
  });
});
