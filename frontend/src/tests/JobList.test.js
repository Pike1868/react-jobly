import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobList from "../components/JobList";
import { mockUserDetails } from "./commonSetup";

jest.mock("../context/UserContext.js", () => ({
  useUserContext: () => mockUserDetails,
}));

describe("JobList", () => {
  const mockJobs = [
    {
      id: 1,
      title: "Software Engineer",
      salary: 120000,
      equity: "0.05",
    },
    {
      id: 2,
      title: "Developer",
      salary: 100000,
      equity: "0.00",
    },
  ];

  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <JobList jobs={mockJobs} />
      </MemoryRouter>
    );

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500)));
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <JobList jobs={mockJobs} />
      </MemoryRouter>
    );
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500)));
    expect(asFragment()).toMatchSnapshot();
  });
});
