import OrderTypes from "src/cammon/types/order-types";

export class CreateMaterialInput implements Omit<OrderTypes.Material, 'id'> {
    name: string;
    type: OrderTypes.MaterialType;
}
