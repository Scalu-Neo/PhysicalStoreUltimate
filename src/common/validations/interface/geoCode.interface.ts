import { GeoCodeResponseDTO } from "src/apis/googleGeoCode/dto/geoCode.dto";

export interface IGoogleGeoCodeValidation {
    validateGeoCodeResponse(response: GeoCodeResponseDTO): void
}