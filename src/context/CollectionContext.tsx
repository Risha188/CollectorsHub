import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";


type CollectionType = "Owned" | "Wishlist" | "Selling";

interface CollectionContextType {
  owned: Product[];
  wishlist: Product[];
  selling: Product[];

  addToCollection: (
    product: Product,
    collection: CollectionType
  ) => boolean

  removeFromCollection: (
    productId: number,
    collection: CollectionType
  ) => void

  moveItem: (
    productId: number,
    from: CollectionType,
    to: CollectionType
  ) => boolean

  isInCollection: (
    productId: number,
    collection: CollectionType
  ) => boolean
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionProvider = ({
  children,
}: CollectionProviderProps) => {
  const [owned, setOwned] = useState<Product[]>(() => {
    const saved = localStorage.getItem("owned");
    return saved ? JSON.parse(saved) : []
  })

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : []
  })

  const [selling, setSelling] = useState<Product[]>(() => {
    const saved = localStorage.getItem("selling");
    return saved ? JSON.parse(saved) : []
  })

  // save owned
  useEffect(() => {
    localStorage.setItem("owned", JSON.stringify(owned));
  }, [owned]);

  // save wishlist 
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist])

  // save selling 
  useEffect(() => {
    localStorage.setItem("selling", JSON.stringify(selling));
  }, [selling])

  const addToCollection = (
    product: Product,
    collection: CollectionType
  ) => {
    let exists = false;
    if (collection === "Owned") {
      exists = owned.some((item) => item.id === product.id);

      if (!exists) {
        setOwned((prev) => [...prev, product])
      }
    }

    if (collection === "Wishlist") {
      exists = wishlist.some((item) => item.id === product.id);

      if (!exists) {
        setWishlist((prev) => [...prev, product])
      }
    }

    if (collection === "Selling") {
      exists = selling.some((item) => item.id === product.id);

      if (!exists) {
        setSelling((prev) => [...prev, product])
      }
    }

    return !exists;
  }

  const removeFromCollection = (
    productId: number,
    collection: CollectionType
  ) => {
    if (collection === "Owned") {
      setOwned((prev) =>
        prev.filter((item) => item.id !== productId)
      )
    }

    if (collection === "Wishlist") {
      setWishlist((prev) =>
        prev.filter((item) => item.id !== productId)
      )
    }

    if (collection === "Selling") {
      setSelling((prev) =>
        prev.filter((item) => item.id !== productId)
      )
    }
  }

  const moveItem = (
  productId: number,
  from: CollectionType,
  to: CollectionType
): boolean => {
  const sourceCollection =
    from === "Owned"
      ? owned
      : from === "Wishlist"
        ? wishlist
        : selling;

  const destinationCollection =
    to === "Owned"
      ? owned
      : to === "Wishlist"
        ? wishlist
        : selling;

  const item = sourceCollection.find(
    (product) => product.id === productId
  );

  if (!item) {
    return false;
  }

  const alreadyExists =
    destinationCollection.some(
      (product) => product.id === productId
    );

  if (alreadyExists) {
    return false;
  }

  setOwned((prev) =>
    from === "Owned"
      ? prev.filter(
          (product) => product.id !== productId
        )
      : to === "Owned"
        ? [...prev, item]
        : prev
  );

  setWishlist((prev) =>
    from === "Wishlist"
      ? prev.filter(
          (product) => product.id !== productId
        )
      : to === "Wishlist"
        ? [...prev, item]
        : prev
  );

  setSelling((prev) =>
    from === "Selling"
      ? prev.filter(
          (product) => product.id !== productId
        )
      : to === "Selling"
        ? [...prev, item]
        : prev
  );

  return true;
};

  const isInCollection = (
    productId: number,
    collection: CollectionType
  ) => {
    if (collection === "Owned") {
      return owned.some((item) => item.id === productId)
    }

    if (collection === "Wishlist") {
      return wishlist.some((item) => item.id === productId)
    }

    return selling.some((item) => item.id === productId);

  };

  return (
    <CollectionContext.Provider
      value={{
        owned,
        wishlist,
        selling,
        addToCollection,
        removeFromCollection,
        moveItem,
        isInCollection
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);

  if(!context){
    throw new Error("useCollection must be used inside CollectionProvider");
  }

  return context;
};