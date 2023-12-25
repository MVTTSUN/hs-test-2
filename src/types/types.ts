type Furniture = {
  id: string;
  type: string;
  src: string;
  coordinate: Coordinate;
};

type Coordinate = {
  x: number;
  y: number;
};

export type { Coordinate, Furniture };
