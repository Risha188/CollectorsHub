import { useMemo, useState } from "react";
import { Search, Trash2, ArrowRight } from "lucide-react";

import { useCollection } from "../context/CollectionContext";
import type { Product } from "../types/product";

type CollectionType = "Owned" | "Wishlist" | "Selling";

const MyCollection = () => {
  const {
    owned,
    wishlist,
    selling,
    removeFromCollection,
    moveItem,
  } = useCollection();

  const [activeCollection, setActiveCollection] =
    useState<CollectionType>("Owned");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  // Get currently selected collection
  const currentItems =
    activeCollection === "Owned"
      ? owned
      : activeCollection === "Wishlist"
        ? wishlist
        : selling;

  // Get unique categories
  const categories = [
    "All",
    ...new Set(
      currentItems.map((product) => product.category)
    ),
  ];

  // Search + filter + sort
  const filteredItems = useMemo(() => {
    const result = currentItems.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(
            b.dateAdded || b.createdAt
          ).getTime() -
          new Date(
            a.dateAdded || a.createdAt
          ).getTime()
      );
    }

    return result;
  }, [
    currentItems,
    search,
    category,
    sort,
  ]);

  // Remove item
  const handleRemove = (productId: number) => {
    removeFromCollection(
      productId,
      activeCollection
    );
  };

  // Move item
  const handleMove = (
    productId: number,
    destination: CollectionType
  ) => {
    const moved = moveItem(
      productId,
      activeCollection,
      destination
    );

    if (!moved) {
      alert(
        `This item is already in ${destination}.`
      );
    } else {
      alert(
        `Item moved to ${destination}.`
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Collection
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your collectibles, wishlist,
            and items you're selling.
          </p>
        </div>

        {/* Collection Tabs */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Owned */}
          <button
            onClick={() => {
              setActiveCollection("Owned");
              setSearch("");
              setCategory("All");
              setSort("newest");
            }}
            className={`rounded-xl border p-5 text-left transition ${
              activeCollection === "Owned"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Owned
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {owned.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Items you own
            </p>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              setActiveCollection("Wishlist");
              setSearch("");
              setCategory("All");
              setSort("newest");
            }}
            className={`rounded-xl border p-5 text-left transition ${
              activeCollection === "Wishlist"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Wishlist
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {wishlist.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Items you want
            </p>
          </button>

          {/* Selling */}
          <button
            onClick={() => {
              setActiveCollection("Selling");
              setSearch("");
              setCategory("All");
              setSort("newest");
            }}
            className={`rounded-xl border p-5 text-left transition ${
              activeCollection === "Selling"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Selling
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {selling.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Items you're selling
            </p>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Search */}
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search your collection..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Categories"
                    : item}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="newest">
                Newest
              </option>

              <option value="price-low">
                Price: Low → High
              </option>

              <option value="price-high">
                Price: High → Low
              </option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            {filteredItems.length}{" "}
            {filteredItems.length === 1
              ? "item"
              : "items"}{" "}
            in {activeCollection}
          </p>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Search
                size={25}
                className="text-gray-400"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              {currentItems.length === 0
                ? `Your ${activeCollection.toLowerCase()} is empty`
                : "No items found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              {currentItems.length === 0
                ? "Add collectibles from the marketplace to see them here."
                : "Try changing your search or category filter."}
            </p>
          </div>
        ) : (

          /* Collection Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredItems.map((product) => (
              <CollectionCard
                key={product.id}
                product={product}
                activeCollection={
                  activeCollection
                }
                onRemove={handleRemove}
                onMove={handleMove}
              />
            ))}

          </div>
        )}
      </div>
    </main>
  );
};

interface CollectionCardProps {
  product: Product;
  activeCollection: CollectionType;
  onRemove: (productId: number) => void;
  onMove: (
    productId: number,
    destination: CollectionType
  ) => void;
}

const CollectionCard = ({
  product,
  activeCollection,
  onRemove,
  onMove,
}: CollectionCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="h-52 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder.png";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Category */}
        <p className="text-sm font-medium text-blue-600">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {product.title}
        </h3>

        {/* Condition */}
        <p className="mt-1 text-sm text-gray-500">
          Condition: {product.condition}
        </p>

        {/* Price */}
        <p className="mt-3 text-lg font-bold text-gray-900">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* Estimated Value + Date */}
        <div className="mt-4 grid grid-cols-2 gap-3">

          <div>
            <p className="text-xs text-gray-400">
              Estimated Value
            </p>

            <p className="font-semibold text-gray-900">
              ₹
              {(
                product.estimatedValue ??
                product.price
              ).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Date Added
            </p>

            <p className="text-sm text-gray-600">
              {new Date(
                product.dateAdded ??
                product.createdAt
              ).toLocaleDateString(
                "en-IN"
              )}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2">

          {/* Move to Owned */}
          {activeCollection !== "Owned" && (
            <button
              onClick={() =>
                onMove(
                  product.id,
                  "Owned"
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowRight size={17} />
              Move to Owned
            </button>
          )}

          {/* Move to Wishlist */}
          {activeCollection !== "Wishlist" && (
            <button
              onClick={() =>
                onMove(
                  product.id,
                  "Wishlist"
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowRight size={17} />
              Move to Wishlist
            </button>
          )}

          {/* Move to Selling */}
          {activeCollection !== "Selling" && (
            <button
              onClick={() =>
                onMove(
                  product.id,
                  "Selling"
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowRight size={17} />
              Move to Selling
            </button>
          )}

          {/* Remove */}
          <button
            onClick={() =>
              onRemove(product.id)
            }
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCollection;