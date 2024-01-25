import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
