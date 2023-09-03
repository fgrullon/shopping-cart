import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}
export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getItemQtn, increaseCartQtn, decreaseCartQtn, removeFromCart } =
    useShoppingCart();

  const qtn = getItemQtn(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column ">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {qtn === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQtn(id)}>
              Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-teims-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQtn(id)}>-</Button>
                <div>
                  <span className="fs-3">{qtn}</span> in cart
                </div>
                <Button onClick={() => increaseCartQtn(id)}>+</Button>
              </div>
              <Button onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
