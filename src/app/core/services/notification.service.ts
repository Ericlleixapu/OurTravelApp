import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }


  
	private isHttpErrorResponse(error: unknown): error is HttpErrorResponse {
		return (error as HttpErrorResponse).status !== undefined;
	}

	public handleError(error: unknown, msg?: string): void {

		if (msg === undefined) {
			msg = 'Error desconocido';
		}

		console.error(msg, error);
		if (this.isHttpErrorResponse(error)) {
			if (error.error) {

				let message = '';

				if (error.error.message) {
					message = error.error.message;
				} else {
					let err = JSON.parse(error.error);

					if (err.message) {
						message = err.message;
					}
				}

				this.toastr.error(message, "Error status " + error.status);
			} else {
				this.toastr.error("Error en la resposta del servidor", msg);
			}
		} else {
			this.toastr.error('Error desconegut', msg);
		}
	}

  
}
