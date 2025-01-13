import { IsArray, IsNotEmpty, ValidateNested, IsObject } from 'class-validator';

export class GeometryDTO {
  @IsObject()
  @ValidateNested()
  location: LocationDTO;
}

export class LocationDTO {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;
}

export class GeoCodeResult {
    geometry:GeometryDTO;
}

export class GeoCodeResponseDTO {
  @IsArray()
  @ValidateNested()
  results: GeoCodeResult[];
}
