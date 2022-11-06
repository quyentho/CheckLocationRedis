export interface CheckLocationResponse {
  address: string;
  isDeliverable: boolean;
  validLocations?: Location[];
}

export interface Location {
  city: string;
  area: string;
}
