import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { TravelService } from '../../../core/services/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../../../core/services/image.service';
import { Travel } from '../../../core/models/travel.model';
import { Destination } from '../../../core/models/destination.model';
import { Image } from '../../../core/models/image.model';
import { FormsModule } from '@angular/forms';

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
  selectedFile: File | null = null;
  destinations: Destination[] = [];
  newComment: string = '';

  public images: Image[] = [];

  constructor(
    private travelService: TravelService,
    private modalService: NgbModal,
    private imageService: ImageService
    ) {
  }
  async ngOnInit() {
    this.travel = this.travelService.getTravel()
    this.destinations = this.travel.destinations;
    this.images = await this.imageService.getImagesByTravel(this.travel._id);
  }


  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1._id === item2._id : item1 === item2;
  }

  openModal(content: TemplateRef<any>, image: Image) {
    this.newComment = '';
    this.selectedImage = image;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openDeleteModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true});
  }

  downloadImage(image: Image) {
    const a = document.createElement('a');
    a.href = image.imageUrl;
    a.download = image.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async addComment(){
    let image = await this.imageService.addComment(this.selectedImage, this.newComment);
    this.images = await this.imageService.getImagesByTravel(this.travel._id);
    this.selectedImage.comments = image.comments;
    this.newComment = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.addNewImage();
  }

  async addNewImage() {
    if (this.checkImageForm() && this.selectedFile != null) {
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
    this.modalService.dismissAll();
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
