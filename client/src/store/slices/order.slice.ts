import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderTypes from "../../types/order-types";
import { Order, OrderDocument, OrderElement } from "../../entities/order";
import { orderSaveThunk } from "../thunks/order/save-order.thunk";
import { setStateThunk } from "../thunks/order/set-state.thunk";
import { OrderState } from "../../enums/order-state.enum";

interface State {
  order: OrderTypes.Order | null;
  loading: boolean;
  error: string;
  saved: boolean;
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

interface RemoveElementPayload {
  documentIndex: number;
  elementKey: string;
}

const initialState: State = {
  order: null,
  loading: false,
  error: "",
  saved: false,
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
      state.saved = true;
      return state;
    },
    createElement: (state, action: PayloadAction<{ element: OrderTypes.Element; index: number }>) => {
      if (!state.order || !state.order.documents[action.payload.index]) {
        return state;
      }
      state.saved = true;
      state.order.documents = state.order.documents.map((document, index) => {
        if (index === action.payload.index) {
          document.elements = [...(document.elements || []), { ...action.payload.element }];
          return document;
        }
        return document;
      });
      state.order = { ...state.order };
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
      return {
        ...state,
        saved: true,
        order: {
          ...state.order,
          ...data,
        },
      };
    },
    updateDocument: (state, action: PayloadAction<UpdateDocumentPayload>) => {
      if (!state.order) {
        return state;
      }
      const index = action.payload.index;
      return {
        ...state,
        saved: true,
        order: {
          ...state.order,
          documents: [
            ...state.order.documents.map((doc, i) => {
              if (index === i) {
                return { ...doc, ...action.payload.document };
              }
              return doc;
            }),
          ],
        },
      };
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

      return {
        ...state,
        saved: true,
        order: {
          ...state.order,
          documents: [...state.order.documents],
        },
      };
    },
    removeElement: (state, action: PayloadAction<RemoveElementPayload>) => {
      const documentIndex = action.payload.documentIndex;
      const elementKey = action.payload.elementKey;
      if (!state.order) {
        return;
      }
      return {
        ...state,
        saved: true,
        order: {
          ...state.order,
          documents: [
            ...(state.order.documents.map((doc, index) => {
              return {
                ...doc,
                elements: [
                  ...(doc.elements
                    ?.map((element) => {
                      if (index === documentIndex && element.key === elementKey) {
                        return { ...element, willBeDeleted: true };
                      }
                      return { ...element };
                    })
                    .filter((element) => !(!element.id && element.willBeDeleted && element.key === elementKey)) || []),
                ],
              };
            }) || []),
          ],
        },
      };
    },
  },
  extraReducers(builder) {
    builder
      // Save order
      .addCase(orderSaveThunk.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(orderSaveThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.order = action.payload;
        state.saved = false;
      })
      .addCase(orderSaveThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "В процессе сохранения заказа, произошла ошибка";
      })
      .addCase(setStateThunk.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(setStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        if (state.order) {
          state.order.state = action.payload.state;
          if (action.payload.state === OrderState.UNDER_EDITING) {
            state.saved = true;
          }
        }
      })
      .addCase(setStateThunk.rejected, (state, action) => {
        console.log("setStateThunk.rejected", action);
        state.loading = false;
        state.error = "Ошибка изменения состояния заказа.";
      });
  },
});

export const { setOrder, updateDocument, updateElement, updateOrder, createOrder, createElement, removeElement } =
  orderSlice.actions;
export default orderSlice.reducer;
