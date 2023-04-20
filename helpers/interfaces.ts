export interface ISource {
  srcset: string;
  type: string;
  media?: string;
  sizes?: string;
}

export interface ITableHeader {
  title: string;
  field: string;
}

export type ExtType = "png" | "jpg" | "webp";

export interface IImage {
  path: string;
  alt: string;
  srcset?: string;
  sizes?: string;
  sources?: ISource[];
  loading?: string;
}

export interface ISlideImgItem {
  id: number;
  img: IImage;
  name: string;
  content?: {
    title: string;
    subtitle?: string;
  };
}

export enum Modals {
  ALERT = "alert",
  RESTORE = "restore",
  RECOVERY_PASSWORD = "recovery-password",
  LOGIN = "login",
  REGISTRATION = "registration",
  CLAIM = "claim",
  CHECK = "check",
}

export enum Statuses {
  PENDING = 0,
  REJECT = 2,
  SUCCESS = 3,
}

export interface IPrize {
  created_at: string;
  delivery: boolean;
  id: number;
  name: string;
  need_delivery: boolean;
  need_passport: boolean;
  slug: string;
  updated_at: string;
}

export interface IPrizeItem {
  id: number;
  created_at: string;
  draw_id: any;
  email_sent: boolean;
  order_number: null | number;
  prize: IPrize;
  prize_id: 18;
  receipt_id: 2;
  updated_at: string;
  user_id: null | number;
  visible: boolean;
  passport?: any;
}

export interface IPerson {
  name: string;
  email: string;
  phone: string;
  city: string;
}

export type User = {
  bdate?: string;
  city: string;
  email: string;
  name: string;
  phone: string;
  surname: string;
};

export interface IReceipt {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  t: string;
  s: string;
  fn: string;
  i: string;
  fp: string;
  status: Statuses;
  description: string;
  uuid: string;
  files: string[];
  network: null | string | any;
  prizes: IPrizeItem[];
}

export interface IWinnersData {
  data: Winner[];
  links: Links;
  meta: Meta;
}

export type Winner = {};
export type Links = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};
export type Meta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type Product = {
  id: number;
  name: string;
  weight: string;
  img: string;
  ca: number;
  d: number;
  count?: number;
};

export type RegistrationPayload = {
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};
export type CheckPayload = {
  qr: string;
  t: string;
  s: string;
  fn: string;
  i: string;
  fp: string;
  date: string;
  time: string;
  files: File[];
};
