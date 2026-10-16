const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;
const MAX_PAGE = 10000;

const COLLECTION_OPTIONS = {
  holdings: {
    projection: { name: 1, qty: 1, avg: 1, price: 1, net: 1, day: 1 },
    sort: { _id: 1 },
  },
  positions: {
    projection: {
      product: 1,
      name: 1,
      qty: 1,
      avg: 1,
      price: 1,
      net: 1,
      day: 1,
      isLoss: 1,
    },
    sort: { _id: 1 },
  },
  orders: {
    projection: { name: 1, qty: 1, price: 1, mode: 1, createdAt: 1 },
    sort: { createdAt: -1, _id: -1 },
  },
};

function parsePagination(query = {}) {
  const parseValue = (key, fallback, maximum) => {
    const rawValue = query[key];
    if (rawValue === undefined) {
      return fallback;
    }

    if (typeof rawValue !== "string" || !/^\d+$/.test(rawValue)) {
      throw new RangeError(`${key} must be a positive integer`);
    }

    const value = Number(rawValue);
    if (!Number.isSafeInteger(value) || value < 1 || value > maximum) {
      throw new RangeError(`${key} must be between 1 and ${maximum}`);
    }

    return value;
  };

  return {
    page: parseValue("page", DEFAULT_PAGE, MAX_PAGE),
    limit: parseValue("limit", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
  };
}

async function getPage(collection, name, pagination) {
  const options = COLLECTION_OPTIONS[name];
  if (!options) {
    throw new TypeError(`Unknown dashboard collection: ${name}`);
  }

  const { page, limit } = pagination;
  const results = await collection
    .find({}, { projection: options.projection })
    .sort(options.sort)
    .skip((page - 1) * limit)
    .limit(limit + 1)
    .toArray();

  return {
    items: results.slice(0, limit),
    page,
    limit,
    hasNextPage: results.length > limit,
  };
}

async function getDashboardData(db, pagination) {
  const names = Object.keys(COLLECTION_OPTIONS);
  const pages = await Promise.all(
    names.map((name) => getPage(db.collection(name), name, pagination))
  );

  return Object.fromEntries(names.map((name, index) => [name, pages[index]]));
}

module.exports = {
  COLLECTION_OPTIONS,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  getDashboardData,
  getPage,
  parsePagination,
};
