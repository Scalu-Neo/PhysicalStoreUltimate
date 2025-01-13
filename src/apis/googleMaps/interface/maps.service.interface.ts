import { GoogleMapsResponseDTO } from "../dto/maps.dto";

export interface IGoogleMapsResponseFormatter {

    formatResponseDistance(responseFormatter: GoogleMapsResponseDTO):number;
}