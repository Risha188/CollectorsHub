import type { Product } from "../../types/product"
import { Heart, Plus } from 'lucide-react'
import { Link } from "react-router-dom";
import { useCollection } from "../../context/CollectionContext";

interface ProductCardProps {
    product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {

    const {addToCollection, isInCollection} = useCollection();

    const isWishlisted = isInCollection(
        product.id,
        "Wishlist"
    )
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {/* Product Image */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <Link
                    to={`/marketplace/${product.id}`}
                    className="absolute inset-0 block"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                </Link>

                {/* Wishlist */}
                <button
                onClick={()=>{
                    const added = addToCollection(
                        product,
                        "Wishlist"
                    )

                    if(added){
                        alert("Added to wishlist!");
                    }else{
                        alert("This item is already in your wishlist.");
                    }
                }} 
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
                    aria-label="Add to wishlist">
                    <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}/>
                </button>
            </div>

            {/* Product Information */}
            <div className="p-4">
                <p className="text-sm font-medium text-blue-600">
                    {product.category}
                </p>

                <Link
                    to={`/marketplace/${product.id}`}
                    className="mt-1 text-lg font-semibold text-gray-900">
                    {product.title}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                    {product.condition}
                </p>

                <p className="mt-3 text-xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>

                <div className="mt-2 text-sm text-gray-500">
                    <p>Seller: {product.seller}</p>
                    <p>{product.location}</p>
                </div>

                {/* Add to Collections */}
                <button
                onClick={()=>{
                    const added = addToCollection(
                        product,
                        "Owned"
                    )

                    if(added){
                        alert("Added to your collection!")
                    }else{
                        alert("This item is already in your collection.")
                    }
                }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add to Collection
                </button>

            </div>
        </div>
    )
}

export default ProductCard;
