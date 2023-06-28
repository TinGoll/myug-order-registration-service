import OrderTypes from "../../types/order-types";

export class OrderDocument implements Partial<OrderTypes.Document> {
  documentType?: string | undefined;
  material?: OrderTypes.Material | null = null;
  facadeModel?: OrderTypes.FacadeModel | null = null;
  texture?: OrderTypes.Textute | null = null;
  panelModel?: OrderTypes.PanelModel | null = null;
  panelMaterial?: OrderTypes.Material | null = null;
  color?: OrderTypes.Color | null = null;
  varnish?: OrderTypes.Varnish | null = null;
  patina?: OrderTypes.Patina | null = null;
  thermalseam?: boolean = false;
  drill?: boolean = false;
  note?: string = "";
  result: object = {};
  elements?: OrderTypes.Element[] = [];
  deleted: boolean = false;
  constructor(documentType: string = "Фасады") {
    this.documentType = documentType;
  }
}
