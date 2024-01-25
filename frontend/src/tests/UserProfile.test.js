import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("SignUp", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });
});
