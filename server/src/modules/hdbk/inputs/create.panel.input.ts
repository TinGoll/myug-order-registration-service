import OrderTypes from "src/cammon/types/order-types";

export class CreatePanelInput implements Omit<OrderTypes.PanelModel, 'id'> {
    name: string;
}
