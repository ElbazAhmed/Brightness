import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000'; // URL of the Flask backend

  constructor(private http: HttpClient) {}

  // Get all buildings
  getBuildings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buildings`);
  }

  // Add a building
  addBuilding(buildingName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/buildings`, { name: buildingName });
  }

  // Get all rooms in a building
  getRooms(buildingId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buildings/${buildingId}/rooms`);
  }

  // Add a room to a building
  addRoom(buildingId: number, roomName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/buildings/${buildingId}/rooms`, {
      name: roomName,
    });
  }

  // Get all lamps in a room
  getLamps(buildingId: number, roomId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/buildings/${buildingId}/rooms/${roomId}/lamps`
    );
  }

  // Add a lamp to a room
  addLamp(
    buildingId: number,
    roomId: number,
    lampName: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/buildings/${buildingId}/rooms/${roomId}/lamps`,
      { name: lampName }
    );
  }
}
