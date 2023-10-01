import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Resource } from './resource.model';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getResorces() {
    return this.http
      .get<{ data: Resource[] }>('https://reqres.in/api/unknown')
      .pipe(
        map((responseData) => {
          const resourcesArray: Resource[] = [];
          for (const resourse of responseData.data) {
            resourcesArray.push(resourse);
          }
          return resourcesArray;
        })
      );
  }
}
