import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Image } from '../models/image.model';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:3000/api/image';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notification: NotificationService,
    private uploadService: UploadService
  ) { }

  async getImagesByTravel(travelId: string): Promise<Image[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Image[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      for (let image of res) {
        this.loadImage(image);
      }
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar les imatges');
      return [];
    }
  }

  async loadImage(image: Image) {
    const headers = this.getAuthHeaders();

    try {
      const url = image.imageUrl;
      image.imageUrl = '';
      const file = await lastValueFrom(this.http.get(url, { headers, responseType: 'blob' }));
      const blob = new Blob([file], { type: image.fileType });
      image.imageUrl = URL.createObjectURL(blob);
    } catch (err) {
      console.error('Error loading image', err);
    }
  }

  async addImage(image: Image, file: File): Promise<Image> {
    const headers = this.getAuthHeaders();
    try {
      let res = await this.uploadService.uploadTravelImage(file);
      if (res.ok) {
        image.filename = res.filename;
        image.imageUrl = res.imageUrl;
        image.fileType = file.type;
        res = await lastValueFrom(this.http.post<Image>(this.baseUrl, image, { headers }));
        return res;
      } else {
        this.notification.handleError('Error al afegir la imatge');
        return {} as Image;
      }
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al afegir la imatge');
      return {} as Image;
    }
  }
  async updateImage(image: Image): Promise<Image> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Image>(this.baseUrl + '/' + image._id, image, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar la imatge');
      return {} as Image;
    }
  }

  async addComment(image: Image,comment: string): Promise<Image> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Image>(this.baseUrl + '/comment/' + image._id, {comment:comment}, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar la imatge');
      return {} as Image;
    }
  }

  async deleteImage(image: Image) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Image>(this.baseUrl + '/' + image._id, { headers }));
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
