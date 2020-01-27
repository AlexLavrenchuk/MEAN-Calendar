import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  public getAll() {
		return this.http.get(`/api/event/getAll`);
  }

  public addNew(newEvent: any) {
		return this.http.post(`/api/event/addNew`, newEvent);
  }

  public delete(deleteIdEvent: string) {
		return this.http.delete(`/api/event/delete/`+ deleteIdEvent);
	}
}
