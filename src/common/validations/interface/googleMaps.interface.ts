import { GoogleMapsResponseDTO } from "src/apis/googleMaps/dto/maps.dto";

export interface IGoogleMapsValidationService {

    validateOriginsAndDestinations(origin: string, destination: string): void;
     validateResponse(response: GoogleMapsResponseDTO): void
}