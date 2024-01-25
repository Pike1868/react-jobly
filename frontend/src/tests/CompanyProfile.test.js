import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyProfile from "../pages/CompanyProfile";

jest.mock("../api/JoblyApi");

describe("CompanyProfile", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CompanyProfile />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyProfile />
      </MemoryRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
