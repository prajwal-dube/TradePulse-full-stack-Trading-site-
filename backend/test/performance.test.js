const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getDashboardData,
  getPage,
  parsePagination,
} = require("../performance");

function createCollection(items) {
  const query = {
    options: null,
    sortValue: null,
    skipValue: null,
    limitValue: null,
    find(filter, options) {
      assert.deepEqual(filter, {});
      this.options = options;
      return this;
    },
    sort(value) {
      this.sortValue = value;
      return this;
    },
    skip(value) {
      this.skipValue = value;
      return this;
    },
    limit(value) {
      this.limitValue = value;
      return this;
    },
    async toArray() {
      return items;
    },
  };

  return query;
}

test("pagination defaults to a bounded first page", () => {
  assert.deepEqual(parsePagination({}), { page: 1, limit: 50 });
});

test("pagination accepts valid page and limit values", () => {
  assert.deepEqual(parsePagination({ page: "3", limit: "25" }), {
    page: 3,
    limit: 25,
  });
});

test("pagination rejects invalid and excessive values", () => {
  for (const query of [
    { page: "0" },
    { page: "1.5" },
    { limit: "101" },
    { limit: "-1" },
  ]) {
    assert.throws(() => parsePagination(query), RangeError);
  }
});

test("getPage applies a projection, stable sort, skip, and limit", async () => {
  const collection = createCollection([
    { name: "ACME" },
    { name: "NEXT" },
  ]);
  const result = await getPage(collection, "orders", { page: 2, limit: 1 });

  assert.deepEqual(result, {
    items: [{ name: "ACME" }],
    page: 2,
    limit: 1,
    hasNextPage: true,
  });
  assert.deepEqual(collection.sortValue, { createdAt: -1, _id: -1 });
  assert.equal(collection.skipValue, 1);
  assert.equal(collection.limitValue, 2);
  assert.ok(collection.options.projection.createdAt);
});

test("getDashboardData returns bounded pages from all three collections", async () => {
  const collections = {
    holdings: createCollection([{ name: "ACME" }], 1),
    positions: createCollection([{ name: "ACME" }], 1),
    orders: createCollection([{ name: "ACME" }], 1),
  };
  const db = { collection: (name) => collections[name] };

  const result = await getDashboardData(db, { page: 1, limit: 10 });

  assert.deepEqual(Object.keys(result), ["holdings", "positions", "orders"]);
  for (const page of Object.values(result)) {
    assert.equal(page.items.length, 1);
    assert.equal(page.limit, 10);
    assert.equal(page.hasNextPage, false);
  }
});
