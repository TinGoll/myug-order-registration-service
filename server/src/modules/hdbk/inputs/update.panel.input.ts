import OrderTypes from "src/cammon/types/order-types";

export class UpdatePanelInput implements Partial<OrderTypes.PanelModel> {
    id: number;    
    name?: string;
}
