export interface Guest {
  adult: number;
  child: number;
}

export interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface Allocation {
  adult: number;
  child: number;
  price: number;
}
