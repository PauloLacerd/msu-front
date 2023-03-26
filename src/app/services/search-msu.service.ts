import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlApi } from 'src/environments/environment';
import { MicrosoftSecurityUpdates, PaginatedResponse } from '../models/interfaces';

const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root'
})
export class SearchMsuService {

  constructor(private http: HttpClient) { }

  getAll(page: number, filterLogs: MicrosoftSecurityUpdates): Observable<PaginatedResponse<MicrosoftSecurityUpdates[]>> {
    let params = new HttpParams()
      .append("page", page.toString())
      .append("id_ms_log", filterLogs.id_ms_log + "")
      .append("documentTitle", filterLogs.documentTitle + "")
      .append("initialReleaseDate", filterLogs.initialReleaseDate + "")
      .append("currentReleaseDate", filterLogs.currentReleaseDate + "");

    return this.http.get<PaginatedResponse<MicrosoftSecurityUpdates[]>>(urlApi + "/microsoftlogs/getall", { params: params });
  }
}
