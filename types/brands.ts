export interface Brand {
  id: string;
  name: string;
}

export interface Color {
  code: string;
  hex: ColorValue;
  id: string;
  name: string;
}

export interface ColorValue {
  hex: string;
  hsv?: {
    s: number;
    a: number;
    v: number;
    h: number;
  };
  rgb?: {
    a: number;
    b: number;
    r: number;
    g: number;
  };
}


export interface ColorCardProps {
  brandId: string;
}
