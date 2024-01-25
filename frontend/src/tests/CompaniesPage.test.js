import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompaniesPage from "../pages/CompaniesPage";

jest.mock("../api/JoblyApi.js");

describe("CompaniesPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CompaniesPage />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompaniesPage />
      </MemoryRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
