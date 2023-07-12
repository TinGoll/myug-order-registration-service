import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderTypes from "../../types/order-types";
import { Order, OrderDocument } from "../../entities/order";

interface State {
  order: OrderTypes.Order | null;
}

interface UpdateDocumentPayload {
  index: number;
  document: Omit<OrderTypes.UpdateDocumentInput, "id">;
}

interface UpdateElementPayload {
  documentIndex: number;
  elementIndex: number;
  component: OrderTypes.Component;
}

const initialState: State = {
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<OrderTypes.CreateOrderInput>) => {
      const order = new Order(action.payload.author);
      const document = new OrderDocument(action.payload.documentType);
      order.documents.push(document);
      state.order = order;
      return state;
    },
    setOrder: (state, action: PayloadAction<OrderTypes.Order | null>) => {
      state.order = action.payload;
    },
    updateOrder: (state, action: PayloadAction<OrderTypes.UpdateOrderInput>) => {
      if (!state.order) {
        return;
      }
      // Убираем необновляемые данные
      const { id, itmId, documents, updatedAt, createdAt, ...data } = action.payload;
      state.order = { ...state.order, ...data };
    },
    updateDocument: (state, action: PayloadAction<UpdateDocumentPayload>) => {
      if (!state.order) {
        return state;
      }
      const index = action.payload.index;
      state.order.documents = state.order.documents.map((doc, i) => {
        if (index === i) {
          return { ...doc, ...action.payload.document };
        }
        return doc;
      });
      return { ...state };
    },
    updateElement: (state, action: PayloadAction<UpdateElementPayload>) => {
      if (!state.order) {
        return;
      }
      const document = state.order.documents[action.payload.documentIndex];
      if (!document || !document.elements) {
        return;
      }
      const element = document.elements[action.payload.elementIndex];
      if (!element) {
        return;
      }
      for (let i = 0; i < element.components.length; i++) {
        const component = element.components[i];
        if (component.name === action.payload.component.name) {
          const data = element.components[i].data;
          element.components[i].data = { ...data, ...action.payload.component.data };
          break;
        }
      }
    },
  },
});

export const { setOrder, updateDocument, updateElement, updateOrder, createOrder } = orderSlice.actions;
export default orderSlice.reducer;
