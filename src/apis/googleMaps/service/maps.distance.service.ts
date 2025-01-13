import { IGoogleMapsResponseFormatter } from "../interface/maps.service.interface";
import { Injectable } from "@nestjs/common";
import { GoogleMapsResponseDTO } from "../dto/maps.dto";

@Injectable()
export class GoogleMapsResponseFormat implements IGoogleMapsResponseFormatter {

    formatResponseDistance(responseFormatter: GoogleMapsResponseDTO): number{

        if(responseFormatter.status === 'OK' && responseFormatter.rows.length > 0) {
            const element = responseFormatter.rows[0].elements[0];
            if(element.status === 'OK') {
              return element.distance.value;
            }
          }
    }
    
}