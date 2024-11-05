import React, { useEffect, useState } from "react";
import styles from "./ProductListing.module.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { useDebouncedSearch } from "../hooks/useDebouncedSearch";

export default function ProductListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);

  const [debouncedVal] = useDebouncedSearch(searchTerm, 500);

  const fetchItems = async () => {
    console.log(skip, limit);
    try {
      const response = await axios.get(`https://dummyjson.com/products/search`, {
        params: {
          q: searchTerm,
          limit: limit,
          skip: skip,
        },
      });
      const newItems = response?.data?.products;

      if (newItems.length < limit) {
        setHasMore(false);
      }

      setItems((prevItems) => [...prevItems, ...newItems]);
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setItems([]);
    setSkip(0);
    setHasMore(true);
  }, [debouncedVal]);

  useEffect(() => {
    fetchItems();
  }, [debouncedVal, skip]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.productListingContainer}>
      <h2 className={styles.productListingHeader}>Actech Search for your product</h2>

      <div>
        <input
          placeholder="Enter your search"
          className={styles.productSearchInput}
          value={searchTerm}
          type="text"
          onChange={handleSearchChange}
        />
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items</p>}
      >
        <div className={styles.productListing}>
          {items.length > 0 ? (
            items.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products found</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
