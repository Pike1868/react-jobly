import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

//Smoke Test
test("renders App without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

//Snapshot Test
test("App component matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
