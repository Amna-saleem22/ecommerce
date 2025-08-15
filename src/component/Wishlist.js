import { useWishlist } from "../component/WishlistContext";
import { useCart } from "../component/CartContext"; // ✅ ab ye error nahi dega

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  
  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (!wishlist.length) {
    return (
      <div className="container py-4">
        <h2>Wishlist</h2>
        <p className="text-muted">Abhi wishlist khaali hai.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Wishlist</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearWishlist}>
          Clear all
        </button>
      </div>

      <div className="row g-3">
        {wishlist.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100">
              <img src={item.image} alt={item.name} className="card-img-top img-thumbnail" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Rs {item.price}</p>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => moveToCart(item)}>
                    Move to Cart
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
