import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'timeline_wishlist';

function readInitialWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readInitialWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function isWishlisted(productId) {
    return items.some((item) => item.id === productId);
  }

  function toggleWishlist(product) {
    setItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  }

  function removeFromWishlist(productId) {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }

  const value = { items, isWishlisted, toggleWishlist, removeFromWishlist, count: items.length };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
