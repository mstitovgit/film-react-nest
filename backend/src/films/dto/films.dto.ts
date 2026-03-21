export class GetFilmsDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class GetFilmsResponseDTO {
  total: number;
  items: GetFilmsDTO[];
}

export class GetScheduleDTO {
  id: string;
  film: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetScheduleResponseDTO {
  total: number;
  items: GetScheduleDTO[];
}
