export interface SneakerImage {
    url: string;
    publicId: string;
   }

  
   
   export interface Sneaker {
    _id: string;
    name: string;
    comentary: string;
    model_id: string;
    images: SneakerImage[];
   }
   
   export interface PaginatedResponse {
    data: Sneaker[];
    total: number;
    page: number;
    totalPages: number;
   }