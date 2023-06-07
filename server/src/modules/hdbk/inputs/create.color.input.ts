import OrderTypes from "src/cammon/types/order-types";

export class CreateColorInput implements Omit<OrderTypes.Color, "id"> {
    name: string;
    type: OrderTypes.ColorType;
}
