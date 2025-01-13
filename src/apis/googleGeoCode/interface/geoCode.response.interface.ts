import { CoordinatesDTO } from "../dto/coordinates.dto";

export interface IGeoCodeResponseFormatter {
    results: Array<{
      geometry: {
        location: CoordinatesDTO;
      };
    }>;
    status: string;
  }