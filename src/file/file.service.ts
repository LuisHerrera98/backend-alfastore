import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(files: Express.Multer.File[]) {
  
    if (files.length == 0) throw new BadRequestException('missing images');
    files.forEach((file) => {
      if (!file.mimetype.includes('image'))
        throw new BadRequestException('Invalid file types');
    });

    const images = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const response = await this.cloudinary
          .uploadImage(files[i])
          .catch((e) => {
            console.log(e);
            
            throw new BadRequestException('Invalid file type.');
          });
        if (response) {
          images.push({
            url: response.secure_url,
            publicId: response.public_id,
          });
        }
      }
    }
    return images;
  }
}
