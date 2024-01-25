import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "../components/CompanyCard";

describe("CompanyCard Component", () => {
  const mockCompany = {
    handle: "mock-company",
    name: "Mock Company",
    description: "Mock company description.",
    numEmployees: 500,
  };

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany} />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard company={mockCompany} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
