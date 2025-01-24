export interface IProduct {
  id: number;
  sku: string;
  name: string;
  cost: number;
  description: string;
  profile: {
    type: string;
  };
}
