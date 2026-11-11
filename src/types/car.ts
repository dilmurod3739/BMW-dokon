export type CarCategory = 'all' | 'm-power' | 'bmw-i' | 'x-series' | 'sedans';

export interface CarSpecs {
  acceleration: string; // 0-100 km/h
  topSpeed: string;
  power: string; // hp / kW
  torque: string;
  range?: string; // Electric range or fuel economy
  drivetrain: string;
  transmission: string;
  engine: string;
}

export interface CarColor {
  name: string;
  hex: string;
}

export interface Car {
  id: string;
  name: string;
  series: string;
  category: Exclude<CarCategory, 'all'>;
  badge?: string; // e.g. "M Power", "Pure Electric", "SAV Flagship"
  tagline: string;
  price: number;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  specs: CarSpecs;
  description: string;
  colors: CarColor[];
  highlights: string[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  carId: string;
  preferredDate: string;
  dealership: string;
  notes?: string;
}

export interface Dealership {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
}
