export interface ITicket {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class PostOrderRequestDTO {
  email: string;
  phone: string;
  tickets: ITicket[];
}

export class OrderResultDTO {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class PostOrderResponseDTO {
  total: number;
  items: OrderResultDTO[];
}
