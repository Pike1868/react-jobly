import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

//Smoke Test
test("renders App without crashing", () => {
  axios.get.mockResolvedValue({ data: [] });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

//Snapshot Test
test("App component matches snapshot", () => {
  axios.get.mockResolvedValue({ data: [] });
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
