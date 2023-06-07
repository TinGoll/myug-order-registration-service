import OrderTypes from "src/cammon/types/order-types";

export class CreateModelInput implements Omit<OrderTypes.FacadeModel, 'id'> {
    name: string;
    assemblyAngle: OrderTypes.AssemblyAngle;
    profileWidth: number[];
}
