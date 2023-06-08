import OrderTypes from 'src/cammon/types/order-types';

export class UpdateDocumentInput implements OrderTypes.UpdateDocumentInput {
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
  result?: object;
  deleted?: boolean;
  createdAt?: string | Date;
  elements?: OrderTypes.Element[];
  order?: OrderTypes.Order;
  updatedAt?: string | Date;
}
