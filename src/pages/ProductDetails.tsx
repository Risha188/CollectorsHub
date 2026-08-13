import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Heart, MapPin, User,  Plus } from 'lucide-react'
import { products } from "../data/products";
import { useCollection } from "../context/CollectionContext";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  const { addToCollection, isInCollection } = useCollection();

  //Post not found
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-x-3xl rounded-xl bg-white p-10 text-center shadow-sm">
          <h1 className="">
            Product not found
          </h1>

          <p className="mt-2 text-gray-500">
            The collectible you're looking for doesn't
            exist.
          </p>

          <Link
            to="/marketplace"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const isWishlisted = isInCollection(
    product.id,
    "Wishlist"
  );

  const isOwned = isInCollection(
    product.id,
    "Owned"
  );

  const handleWishlist = () => {
    const added = addToCollection(
      product,
      "Wishlist"
    );

    if (added) {
      alert("Added to wishlist!");
    } else {
      alert(
        "This item is already in your wishlist."
      );
    }
  };

  const handleCollection = () => {
    const added = addToCollection(
      product,
      "Owned"
    );

    if (added) {
      alert("Added to your collection!");
    } else {
      alert(
        "This item is already in your collection."
      );
    }
  };


   return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/marketplace"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Marketplace
        </Link>

        {/* Product */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image */}
            <div className="bg-gray-100">

              <img
                src={product.image}
                alt={product.title}
                className="h-full min-h-87.5 w-full object-cover lg:min-h-137.5"
              />

            </div>

            {/* Information */}
            <div className="p-6 sm:p-8 lg:p-10">

              {/* Category */}
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Price */}
              <p className="mt-5 text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              {/* Condition */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500">
                  Condition
                </p>

                <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  {product.condition}
                </span>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-gray-100 pt-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  {product.description}
                </p>

              </div>

              {/* Seller */}
              <div className="mt-6 border-t border-gray-100 pt-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  Seller Information
                </h2>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center gap-3 text-gray-600">
                    <User size={19} />
                    <span>{product.seller}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={19} />
                    <span>{product.location}</span>
                  </div>

                </div>

              </div>

              {/* Buttons */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Heart
                    size={19}
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }
                  />

                  {isWishlisted
                    ? "Wishlisted"
                    : "Add to Wishlist"}
                </button>

                {/* Collection */}
                <button
                  type="button"
                  onClick={handleCollection}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus size={19} />

                  {isOwned
                    ? "Already in Collection"
                    : "Add to Collection"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductDetails;