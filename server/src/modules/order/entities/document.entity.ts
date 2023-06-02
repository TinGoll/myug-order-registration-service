import { Entity } from 'typeorm';
import OrderTypes from '../types/order-types';

@Entity('documents')
export class Document implements OrderTypes.Document {
  id: number;
  documentType?: string;
  material?: OrderTypes.Material;
  facadeModel?: OrderTypes.FacadeModel;
  texture?: OrderTypes.Textute;
  panelModel?: OrderTypes.PanelModel;
  panelMaterial?: OrderTypes.Material;
  color?: OrderTypes.Color;
  varnish?: OrderTypes.Varnish;
  patina?: OrderTypes.Patina;
  thermalseam?: boolean;
  drill?: boolean;
  note?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  result: object;
  elements?: OrderTypes.Element[];
}
