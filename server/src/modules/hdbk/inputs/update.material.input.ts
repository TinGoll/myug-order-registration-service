import OrderTypes from 'src/cammon/types/order-types';

export class UpdateMaterialInput implements Partial<OrderTypes.Material> {
  id: number;
  name?: string;
  type?: OrderTypes.MaterialType;
}
