import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";
import { addProductToCartRequest, removeProductToCartRequest } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

interface CatalogItemProps {
  product: IProduct;
}

const Catalogitem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  })

  const handleAddProductToCart = useCallback((product) => {
    dispatch(addProductToCartRequest(product))
  }, [dispatch])

  const handleRemoveProductInCart = useCallback((product) => {
    dispatch(removeProductToCartRequest(product))
  }, [dispatch])
  
  return (
    <article key={product.id}>
      <strong>{product.title}</strong>
      <span>{product.price}</span>
      <button
        type="button"
        onClick={() => handleAddProductToCart(product)}
      >
        comprar
      </button>
      <button
        type="button"
        onClick={() => handleRemoveProductInCart(product)}
      >
        remover
      </button>
      {hasFailedStockCheck && <span style={{ color: "red" }}>Acabou o estoque!</span>}
    </article>
  )
}
export default Catalogitem