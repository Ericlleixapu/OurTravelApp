import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { TravelService } from '../../../core/services/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../../core/services/document.service';
import { Travel } from '../../../core/models/travel.model';
import { Destination } from '../../../core/models/destination.model';
import { Document, DocumentIcon } from '../../../core/models/document.model';
import { FormsModule } from '@angular/forms';
import { TravelElementComponent } from '../../../shared/components/travel-element/travel-element.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, TravelElementComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  DocumentIcon = DocumentIcon;
  travel: Travel = {} as Travel;
  selectedDocument: Document = {} as Document;
  selectedFile: File | null = null;
  destinations: Destination[] = [];
  newComment: string = '';

  public documents: Document[] = [];

  constructor(
    private travelService: TravelService,
    private modalService: NgbModal,
    private documentService: DocumentService
  ) {
  }

  async ngOnInit() {
    this.travel = this.travelService.getTravel()
    this.documents = await this.documentService.getDocumentsByTravel(this.travel._id);
  }

  openModal(content: TemplateRef<any>, document: Document) {
    this.newComment = '';
    this.selectedDocument = JSON.parse(JSON.stringify(document));
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  downloadDocument(doc: Document) {
    if (doc.fileType == 'application/pdf') {
      window.open(doc.documentUrl, '_blank');
      return;
    }
    const a = document.createElement('a');
    a.href = doc.documentUrl;
    a.download = doc.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.addNewDocument();
  }

  async addNewDocument() {
    if (this.checkDocumentForm() && this.selectedFile != null) {
      let document: Document = {} as Document;
      document.travelId = this.travel._id;
      document.fileType = this.selectedFile.type;
      document.name = this.selectedFile.name;
      await this.documentService.addDocument(document, this.selectedFile);
      this.documents = await this.documentService.getDocumentsByTravel(this.travel._id);
      this.modalService.dismissAll();
    }
  }

  async removeDocument(document: Document) {
    await this.documentService.deleteDocument(document);
    this.documents = await this.documentService.getDocumentsByTravel(this.travel._id);
    this.modalService.dismissAll();
  }

  async updateDocument() {
    await this.documentService.updateDocument(this.selectedDocument);
    this.documents = await this.documentService.getDocumentsByTravel(this.travel._id);
    this.modalService.dismissAll();
  }

  checkDocumentForm() {
    return true;
    alert('El tipus de imatge ha de ser jpeg o png');
    this.selectedFile = null;
    return true;
  }
}
