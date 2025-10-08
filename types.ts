
export interface Entry {
  id: string;
  name: string;
  guest: number;
  sales: number;
  reportSales: number;
  location: string;
}

export enum Page {
  Login,
  Input,
  Output,
}
