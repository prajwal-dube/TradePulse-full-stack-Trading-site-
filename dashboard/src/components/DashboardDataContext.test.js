import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import {
  DashboardDataProvider,
  DashboardPagination,
  useDashboardData,
} from "./DashboardDataContext";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

const initialPage = {
  items: [{ _id: "holding-1", name: "ACME", qty: 1, avg: 10, price: 11 }],
  page: 1,
  limit: 100,
  hasNextPage: true,
};

const paginatedDashboardData = {
  holdings: initialPage,
  positions: { ...initialPage, items: [] },
  orders: { ...initialPage, items: [] },
};

const DashboardHarness = () => {
  const { data } = useDashboardData();
  if (!data) {
    return null;
  }

  return (
    <DashboardPagination collection="holdings" pageData={data.holdings} />
  );
};

test("loads all dashboard data once and fetches later pages on demand", async () => {
  axios.get
    .mockResolvedValueOnce({ data: paginatedDashboardData })
    .mockResolvedValueOnce({
      data: [{ _id: "holding-101", name: "NEXT" }],
      headers: { "x-has-next-page": "true" },
    });

  render(
    <DashboardDataProvider>
      <DashboardHarness />
    </DashboardDataProvider>
  );

  await waitFor(() =>
    expect(axios.get).toHaveBeenCalledWith("/dashboard-data", {
      params: { limit: 100 },
    })
  );
  fireEvent.click(await screen.findByRole("button", { name: "Next" }));

  await waitFor(() =>
    expect(axios.get).toHaveBeenNthCalledWith(2, "/allHoldings", {
      params: { page: 2, limit: 100 },
    })
  );
  expect(await screen.findByText("Page 2")).not.toBeNull();
});
