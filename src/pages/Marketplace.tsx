import { useMemo } from "react"
import ProductGrid from "../components/marketplace/ProductGrid"
import { products } from "../data/products"
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import StatusMessage from "../components/common/StatusMessage";

const Marketplace = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  // Get filter values from URL 
  const search =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "All";

  const condition =
    searchParams.get("condition") || "All";

  const sort =
    searchParams.get("sort") || "newest";


  //get unique categories from products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ]

  const conditions = [
    "All",
    ...new Set(products.map((product) => product.condition)),
  ]

  // update URL filters
  const updateFilter = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(searchParams);

    if (
      value === "" ||
      value === "All" ||
      (key === "sort" && value === "newest")
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  // filter and sort products 
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' || product.category === category;

      const matchesCondition = condition === 'All' || product.condition === condition;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition
      )
    })

    //sorting
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sort === 'newest') {
      result.sort((a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    }

    return result
  }, [search, category, condition, sort])

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Marketplace
          </h1>

          <p className="MT-2 text-gray-600">
            Discover unique collectibles from collectors around the world.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Search collectibles..."
              value={search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Category */}
          <select
            value={category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All Categories' : item}
              </option>
            ))}
          </select>

          {/* Condition */}
          <select
            value={condition}
            onChange={(e) => updateFilter("condition", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {conditions.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="newest">Newest</option>
            <option value="price-low">
              Price: Low → High
            </option>
            <option value="price-high">
              Price: High → Low
            </option>
          </select>

        </div>

        {/* Result Count */}
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "collectible" : "collectibles"}{" "}
            found
          </p>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <StatusMessage
            type="empty"
            message="No collectibles found. Try changing your search or filters."
          />
        )}

      </div>

    </main>
  )
}

export default Marketplace;
