import OrderTypes from "src/cammon/types/order-types";

export class UpdateVarnishInput implements Partial<OrderTypes.Varnish> {
    id: number;
    name?: string;
    type?: string;
}
