import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RouteList from "../routes/RouteList";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("RouteList", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <RouteList />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <RouteList />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("renders HomePage when user is logged in", () => {
    render(
      <MemoryRouter>
        <RouteList />
      </MemoryRouter>
    );

    const element = screen.getByText(/Welcome Back/);

    expect(element).toBeInTheDocument();
  });
});
