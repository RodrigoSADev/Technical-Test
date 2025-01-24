export interface IProduct {
  id: number;
  sku: string;
  name: string;
  description: string;
  cost: number;
}

export interface IResponseProduct extends IProduct {
  profile: {
    type: 'furniture' | 'equipment' | 'stationary' | 'part';
    available: boolean;
    backlog?: number;
    customProperties: { [key: string]: string };
  };
}
