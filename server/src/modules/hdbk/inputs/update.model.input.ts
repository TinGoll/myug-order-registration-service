import OrderTypes from "src/cammon/types/order-types";

export class UpdateModelInput implements Partial<OrderTypes.FacadeModel> {
    id: number;
    assemblyAngle?: OrderTypes.AssemblyAngle;
    name?: string;
    profileWidth?: number[];
}
