import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { plantmodel } from '../plantmodel';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  
  http: any;
  find(arg0: (user: any) => boolean) {
    throw new Error('Method not implemented.');
  }

  private baseURL = "http://localhost:8085/guidance/rest_api/plant/all/";
  private baseURL1 = "http://localhost:8085/guidance/rest_api/plant/update/1/";
  private baseURL3 = "http://localhost:8085/guidance/rest_api/plant/1/";
  private baseURL2 = "http://localhost:8085/guidance/rest_api/plant/update/1/delete/1/"

  constructor(private httpClient: HttpClient) { }
  
  getPlantList(): Observable<plantmodel[]>{
    return this.httpClient.get<plantmodel[]>(`${this.baseURL}`);
  }

  createPlant(plantmodel: plantmodel): Observable<Object>{
    return this.httpClient.post(`${this.baseURL3}`, plantmodel);
  }

  getPlantById(plantid: number): Observable<plantmodel>{
    return this.httpClient.get<plantmodel>(`${this.baseURL}/${plantid}`);
  }
  updatePlants(plantid: number, plant: plantmodel): Observable<Object>{
    return this.httpClient.put(`${this.baseURL1}/${plantid}`, plant);
  }

  deletePlant(plantid: number, plant: plantmodel): Observable<Object>{
    return this.httpClient.put(`${this.baseURL2}/${plantid}`,plant);
  }
  }
