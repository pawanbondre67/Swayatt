export interface OrderData {
  productName: string;
  quantity: number;
  priority: string;
  materialsUsed: [{ materialId: string; quantity: number }];
  workstationName: string;
}
