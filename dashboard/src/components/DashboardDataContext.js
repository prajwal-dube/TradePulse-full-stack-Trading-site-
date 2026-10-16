import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

const DashboardDataContext = createContext(null);

export const DashboardDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef(null);

  const refresh = useCallback(() => {
    if (!requestRef.current) {
      setLoading(true);
      setError("");
      requestRef.current = axios
        .get("/dashboard-data", { params: { limit: 100 } })
        .then((response) => {
          setData(response.data);
        })
        .catch((requestError) => {
          setError(
            requestError.response?.data?.error ||
              "Unable to load dashboard data. Please try again."
          );
        })
        .finally(() => {
          requestRef.current = null;
          setLoading(false);
        });
    }

    return requestRef.current;
  }, []);

  const loadCollectionPage = useCallback(async (collection, page) => {
    const endpoints = {
      holdings: "/allHoldings",
      positions: "/allPositions",
      orders: "/allOrders",
    };
    const endpoint = endpoints[collection];
    if (!endpoint) {
      throw new Error(`Unsupported dashboard collection: ${collection}`);
    }

    setPageLoading(true);
    setError("");
    try {
      const response = await axios.get(endpoint, {
        params: { page, limit: 100 },
      });
      setData((currentData) => ({
        ...currentData,
        [collection]: {
          items: response.data,
          page,
          limit: 100,
          hasNextPage: response.headers["x-has-next-page"] === "true",
        },
      }));
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Unable to load this page. Please try again."
      );
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <DashboardDataContext.Provider
      value={{
        data,
        error,
        loading,
        pageLoading,
        refresh,
        loadCollectionPage,
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error("useDashboardData must be used within DashboardDataProvider");
  }
  return context;
};

export const DashboardDataStatus = () => {
  const { error, loading, pageLoading, refresh } = useDashboardData();

  if (loading || pageLoading) {
    return <p role="status">Loading dashboard data...</p>;
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={refresh}>
          Retry
        </button>
      </div>
    );
  }

  return null;
};

export const DashboardPagination = ({ collection, pageData }) => {
  const { loadCollectionPage, pageLoading } = useDashboardData();
  if (!pageData || (pageData.page <= 1 && !pageData.hasNextPage)) {
    return null;
  }

  return (
    <nav aria-label={`${collection} pages`}>
      <button
        type="button"
        disabled={pageLoading || pageData.page <= 1}
        onClick={() => loadCollectionPage(collection, pageData.page - 1)}
      >
        Previous
      </button>
      <span>
        Page {pageData.page}
      </span>
      <button
        type="button"
        disabled={pageLoading || !pageData.hasNextPage}
        onClick={() => loadCollectionPage(collection, pageData.page + 1)}
      >
        Next
      </button>
    </nav>
  );
};
