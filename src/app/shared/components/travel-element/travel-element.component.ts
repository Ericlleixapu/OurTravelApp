import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-element',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './travel-element.component.html',
  styleUrl: './travel-element.component.scss'
})
export class TravelElementComponent {
  @Input() logo: string = '';
  @Input() image: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() dateFrom: Date|null = null;
  @Input() dateTo: Date|null = null;

  @Output() onClick = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  public remove: boolean = false;
  public edit: boolean = false;

  constructor(private modalService: NgbModal) {}

  click() {
    if(!this.remove&&!this.edit){
      this.onClick.emit();
    }
    this.remove = false;
    this.edit = false;
  }

  removeClick(){
    this.onDelete.emit();
  }
  editClick(){
    this.onEdit.emit();
  }

  removeModal(deleteModal: TemplateRef<any>) {
    this.modalService.open(deleteModal, { centered: true, backdrop: 'static' });
  }

}
