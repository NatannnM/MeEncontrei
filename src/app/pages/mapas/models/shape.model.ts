export interface ShapeData {
  markers: MarkerShape[];
  circles: CircleShape[];
  rectangles: RectangleShape[];
  polygons: PolygonShape[];
  polylines: PolylineShape[];
}

export interface MarkerShape {
  mapObject: google.maps.Marker;
  centered: boolean;
  zoom: number;
  icon: number;
  name: string;
  description: string;
}

export interface CircleShape {
  mapObject: google.maps.Circle;
}

export interface RectangleShape {
  mapObject: google.maps.Rectangle;
}

export interface PolygonShape {
  mapObject: google.maps.Polygon;
}

export interface PolylineShape {
  mapObject: google.maps.Polyline;
}