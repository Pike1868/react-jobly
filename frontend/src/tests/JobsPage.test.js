import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobsPage from "../pages/JobsPage";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("JobsPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <JobsPage />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobsPage />
      </MemoryRouter>
    );

    expect(asFragment).toMatchSnapshot();
  });
});
