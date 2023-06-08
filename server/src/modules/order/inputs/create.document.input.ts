import OrderTypes from 'src/cammon/types/order-types';

export class CreateDocumentInput implements OrderTypes.CreateDocumentInput {
    id?: number;
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
    createdAt?: string | Date;
    updatedAt?: string | Date;
    result?: object;
    elements?: OrderTypes.Element[];
    order?: OrderTypes.Order;
    deleted?: boolean;
}
