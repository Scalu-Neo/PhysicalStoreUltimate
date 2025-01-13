
export interface IDistanceApiService {

    getDistanceMatrix(origin: string, destination: string):Promise<number>
}