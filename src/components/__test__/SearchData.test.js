import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Avatar from "../js/Avatar";

const MockAvatar = ({ src }) => {
  return (
    <BrowserRouter>
      <Avatar src={src} />
    </BrowserRouter>
  );
};

it("should be able to print user avatar", () => {
  render(<MockAvatar src="photosrc" />);
  const user_avatar = screen.getByRole("img");
  expect(user_avatar.getAttribute("src")).toEqual("photosrc");
});
