import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostFilter from "../js/PostFilter";

it("should be filter", () => {
  render(<PostFilter currentFilter="all" />);
  const currentFilter = screen.getByRole("button", { name: /all/i });
  expect(currentFilter).toHaveClass("clickbutton");
});
