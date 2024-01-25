import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("SignUp", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });
});
