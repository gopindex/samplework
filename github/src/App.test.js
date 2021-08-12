import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./components/Dashboard";

test("renders learn react link", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
