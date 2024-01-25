import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("Homepage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });
});
