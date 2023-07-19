import { OrderState } from "../enums/order-state.enum";
import PersonTypes from "./person-types";

const componentKeys = ["geometry", "price"] as const;

declare module OrderTypes {
  interface Order {
    key: string;
    id?: number;
    itmId: number | null;
    note?: string | null;
    clientNumner: string | null;
    author: Author | null;
    client: Client | null;
    manager: Manager | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: Status | null;
    state?: OrderState;
    result: OrderResult;
    documents: Document[];
    deleted: boolean;
  }

  interface Document {
    key: string;
    id?: number;
    documentType?: string;
    material?: Material | null;
    facadeModel?: FacadeModel | null;
    texture?: Textute | null;
    panelModel?: PanelModel | null;
    panelMaterial?: Material | null;
    color?: Color | null;
    varnish?: Varnish | null;
    patina?: Patina | null;
    thermalseam?: boolean;
    drill?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    result: DocumentResult;
    elements?: Element[];
    order?: Order;
    deleted: boolean;
  }

  interface CreateOrderInput extends Partial<Order> {
    documentType?: string;
    author: Author;
  }
  interface UpdateOrderInput extends Partial<Order> {}
  interface CreateDocumentInput extends Partial<Document> {}
  interface UpdateDocumentInput extends Partial<Document> {
    id: number;
  }
  interface UpdateElementInput extends Partial<Element> {
    id: number;
  }

  interface Material {
    id: number;
    name: string;
    type: MaterialType | null;
  }

  interface FacadeModel {
    id: number;
    name: string;
    assemblyAngle: AssemblyAngle;
    profileWidth: number[];
  }

  interface PanelModel {
    id: number;
    name: string;
  }

  interface Color {
    id: number;
    name: string;
    type: ColorType;
  }

  interface Varnish {
    id: number;
    name: string;
    type: VarnishType;
  }

  interface Patina {
    id: number;
    name: string;
    type: PatinaType;
  }

  interface Element {
    key: string;
    id?: number;
    name: string;
    note: string;
    nomenclature: Nomenclature;
    willBeDeleted?: boolean;
    components: Component[];
    document?: Document;
  }

  interface Nomenclature {
    id: number;
    name: string;
    group: string;
    components: Component[];
    orderBy: number;
    typeOf?: string[];
    deleted: boolean;
  }

  interface Component<T extends object = object> {
    name: ComponentKey;
    data?: T;
  }

  interface Geometry {
    height?: number;
    width?: number;
    depth?: number;
    amount?: number;
    square?: number;
    cubature?: number;
    perimeter?: number;
    linearMeters?: number;
  }

  interface Price {
    price: number;
    value: number;
    unit: Unit;
  }

  interface Hdbk {
    nomenclatures: OrderTypes.Nomenclature[];
    colors: OrderTypes.Color[];
    materials: OrderTypes.Material[];
    models: OrderTypes.FacadeModel[];
    panels: OrderTypes.PanelModel[];
    patinas: OrderTypes.Patina[];
    varnishes: OrderTypes.Varnish[];
  }

  type Unit = "м²" | "м.п" | "шт." | "м. куб." | "п.м.п";
  type AssemblyAngle = "90" | "45";
  type Textute = "Витая" | "Прямая";
  type MaterialType = "Твердая порода" | "Мягкая порода" | "МДФ";
  type ColorType = "Эмаль" | "Морилка";
  type VarnishType = string;
  type PatinaType = string;

  type ComponentKey = (typeof componentKeys)[number];

  type OrderResult = object;
  type DocumentResult = object;

  type Status = string;

  interface Author extends PersonTypes.Person {}
  interface Client extends PersonTypes.Person {}
  interface Manager extends PersonTypes.Person {}
}

export default OrderTypes;
