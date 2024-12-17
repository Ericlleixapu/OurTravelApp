import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Document } from '../models/document.model';
import { UploadService } from './upload.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private server = environment.apiUrl;
  private baseUrl = this.server + 'document';
  private baseFileUrl = this.server + 'file';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notification: NotificationService,
    private uploadService: UploadService
  ) { }

  async getDocumentsByTravel(travelId: string): Promise<Document[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Document[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      for (let document of res) {
        this.loadDocument(document);
      }
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar les imatges');
      return [];
    }
  }

  async loadDocument(document: Document) {
    const headers = this.getAuthHeaders();

    try {
      const file = await lastValueFrom(this.http.get(this.baseFileUrl + '/travelDocument/' + document.filename, { headers, responseType: 'blob' }));
      const blob = new Blob([file], { type: document.fileType });
      document.documentUrl = URL.createObjectURL(blob);
    } catch (err) {
      console.error('Error loading document', err);
    }
  }

  async addDocument(document: Document, file: File): Promise<Document> {
    const headers = this.getAuthHeaders();
    try {
      let res = await this.uploadService.uploadTravelDocument(file);
      if (res.ok) {
        document.filename = res.filename;
        document.documentUrl = res.documentUrl;
        res = await lastValueFrom(this.http.post<Document>(this.baseUrl, document, { headers }));
        return res;
      } else {
        this.notification.handleError('Error al afegir la imatge');
        return {} as Document;
      }
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al afegir la imatge');
      return {} as Document;
    }
  }
  async updateDocument(document: Document): Promise<Document> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Document>(this.baseUrl + '/' + document._id, document, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar la imatge');
      return {} as Document;
    }
  }

  async deleteDocument(document: Document) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Document>(this.baseUrl + '/' + document._id, { headers }));
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al eliminar la imatge');
    }
  }
  public getToken(): string {
    return this.authService.getToken() || '';
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }

}