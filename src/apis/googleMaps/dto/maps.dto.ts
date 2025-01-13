
export class DistanceDTO {
    value: number; // Distância em metros
    text: string;  // Distância legível (ex: "5.7 km")
  }
  
  export class ElementDTO {
    status: string;  // Status do elemento (por exemplo, 'OK')
    distance: DistanceDTO; // Objeto contendo a distância
    duration: DistanceDTO; // Objeto contendo a duração
  }
  
  export class RowDTO {
    elements: ElementDTO[]; // Lista de elementos (distância, duração, etc.)
  }
  
  export class GoogleMapsResponseDTO {
    status: string;  // Status da resposta da API (ex: 'OK')
    rows: RowDTO[];  // Lista de linhas de origem/destino
  }
  