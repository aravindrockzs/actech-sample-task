import React from "react";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="img-container">
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">${product.price.toFixed(2)}</p>
        <p className="card-rating">Rating: ⭐️{product.rating} (5/5)</p>
        <p className="card-description">{product.description}</p>
        <div className="card-tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
