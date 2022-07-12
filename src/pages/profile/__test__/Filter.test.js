import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostFilter from "../js/Filter";

it("should be filter", () => {
  render(<PostFilter currentFilter="all" />);
  const currentFilter = screen.getByRole("button", { name: /all/i });
  const currentStyle = window.getComputedStyle(currentFilter);
  expect(currentStyle.color).toBe("black");
});
