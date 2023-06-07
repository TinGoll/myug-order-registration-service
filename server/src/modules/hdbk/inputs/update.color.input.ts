import OrderTypes from 'src/cammon/types/order-types';

export class UpdateColorInput implements Partial<OrderTypes.Color> {
  id: number;
  name?: string;
  type?: OrderTypes.ColorType;
}
