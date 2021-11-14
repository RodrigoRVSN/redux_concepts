import produce from "immer";
import { Reducer } from "react";
import { ActionTypes, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
}

const cart: Reducer<ICartState, undefined> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        console.log(product.id);
        const productInCartIndex = draft.items.findIndex((item) => item.product.id === product.id);

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
          return
        }

        draft.items.push({
          product,
          quantity: 1
        })
        break;
      }

      case ActionTypes.removeProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex((item) => item.product.id === product.id);
        
        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity--;
          return
        }

        return draft;

      }

      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }

      case ActionTypes.removeProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }

      default: {
        return draft;
      }

    }

  })

}

export default cart