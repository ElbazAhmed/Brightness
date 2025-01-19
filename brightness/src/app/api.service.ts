import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.28.177:5000'; // URL of the Flask backend
  private ardUrl = 'http://192.168.28.140'; // arduino-ip-address

  constructor(private http: HttpClient) {}

  // Get all buildings
  getBuildings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buildings`);
  }

  // Get all buildings
  getBuilding(buildingId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/buildings/${buildingId}`);
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
      `${this.baseUrl}/buildings/${buildingId}/rooms/${roomId}`
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


  // Turn on or off the automatique mode 
  setMode(mode: string): Observable<any> {
    const url = `${this.ardUrl}/setMode`;
    const body = new URLSearchParams();
    body.set('mode', mode);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(url, body.toString(), { headers });
  }

  getMode(): Observable<any> {
    const url = `${this.ardUrl}/getMode`; 
    return this.http.get(url);
  }

  setBright(value: number): Observable<any> {
    const url = `${this.ardUrl}/setBrightness`;
    const body = new URLSearchParams();
  
    // Convert the number to a string
    body.set('value', value.toString());
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.http.post(url, body.toString(), { headers });
  }
}
