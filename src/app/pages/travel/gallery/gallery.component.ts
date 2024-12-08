import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { TravelService } from '../../../core/services/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../../../core/services/image.service';
import { Travel } from '../../../core/models/travel.model';
import { Destination } from '../../../core/models/destination.model';
import { Image } from '../../../core/models/image.model';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  travel: Travel = {} as Travel;
  selectedImage: Image = {} as Image;
  selectedFile: File |null= null;
  destinations: Destination[] = [];
  token: string = '';

  public images: Image[] = [];

  constructor(
    private travelService: TravelService,
    private modalService: NgbModal,
    private imageService: ImageService,
  ) {
  }
  async ngOnInit() {
    this.token = this.imageService.getToken();
    this.travel = await this.travelService.getTravel()
    this.destinations = this.travel.destinations;
    this.images = await this.imageService.getImagesByTravel(this.travel._id);

    this.selectedImage = this.newImage();
  }


  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1._id === item2._id : item1 === item2;
  }

  openAddNewImage(content: TemplateRef<any>, image?: Image) {
    this.selectedImage = image || this.newImage();
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  newImage(): Image {
    return {} as Image;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async addNewImage() {
    if (this.checkImageForm() && this.selectedFile!=null) {
      this.selectedImage.travelId = this.travel._id;
      await this.imageService.addImage(this.selectedImage, this.selectedFile);
      this.images = await this.imageService.getImagesByTravel(this.travel._id);
      this.modalService.dismissAll();
    } 
  }
  async updateImage() {
    if (this.checkImageForm()) {
      this.selectedImage = await this.imageService.updateImage(this.selectedImage);
      this.modalService.dismissAll();
    } else {
      alert('S han d\'omplir tots els camps.');
    }
  }
  async removeImage(image: Image) {
    await this.imageService.deleteImage(image);
    this.images = await this.imageService.getImagesByTravel(this.travel._id);
  }

  checkImageForm() {
    if (this.selectedFile?.type === 'image/jpeg' || this.selectedFile?.type === 'image/png') {
      return true;
    }
    alert('El tipus de imatge ha de ser jpeg o png');
    this.selectedFile = null;
    return true;
  }
}
