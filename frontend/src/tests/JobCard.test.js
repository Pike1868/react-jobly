import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobCard from "../components/JobCard";
import { mockUserDetails } from "./commonSetup"; 

jest.mock("../context/UserContext", () => ({
  useUserContext: () => mockUserDetails, 
}));

describe("JobCard Component", () => {
  const mockJob = {
    id: 1,
    title: "Software Engineer",
    salary: 120000,
    equity: "0.05",
  };

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobCard job={mockJob} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
