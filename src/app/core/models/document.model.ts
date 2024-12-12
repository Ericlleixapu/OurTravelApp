import { Destination } from "./destination.model";

export interface Document {
  _id?: string;
  name: string;
  type: string;
  destination?: Destination;
  comment?: string;
  documentUrl: string;
  uploadDate: Date;
  filename: string;
  fileType: string;
  owner: string;
  travelId: string;
}

export const DocumentIcon: Record<string, string> = {
      'application/pdf': 'file-pdf',
      'application/msword': 'file-word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-word',
      'image/jpeg': 'file-image',
      'image/png': 'file-image',
      'text/plain': 'file-alt',
      'text/csv': 'file-csv',
      'application/vnd.ms-excel': 'file-excel',
      'application/zip': 'file-archive',
      'application/x-zip-compressed': 'file-archive',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-excel',
  };
