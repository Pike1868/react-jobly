const JoblyApi = {
  register: jest.fn().mockResolvedValue({ token: "fakeToken" }),
  login: jest.fn().mockResolvedValue({ token: "fakeToken" }),
  getAllCompanies: jest.fn().mockResolvedValue({
    companies: [
      {
        handle: "google",
        name: "Google",
        "num-employees": "1000",
        description: "Dummy company for tests",
        logo_url: null,
      },
      {
        handle: "bauer-gallagher",
        name: "Bauer-Gallagher",
        "num-employees": "862",
        description: "Dummy company for tests",
        logo_url: null,
      },
    ],
  }),
  getCompany: jest.fn().mockResolvedValue({ company: {} }),
  getAllJobs: jest.fn().mockResolvedValue({
    jobs: [
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
    ],
  }),
  getJob: jest.fn().mockResolvedValue(
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
    }
  ),
  getUser: jest.fn().mockResolvedValue({ user: {} }),
  updateUser: jest.fn().mockResolvedValue({ user: {} }),
  applyToJob: jest.fn().mockResolvedValue({ applied: 1 }),
};

export default JoblyApi;
