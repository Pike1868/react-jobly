import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("SignIn", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });
});
