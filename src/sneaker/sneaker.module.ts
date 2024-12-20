import { Module } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { FileService } from 'src/file/file.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sneaker, SneakerSchema } from './entities/sneaker.entity';

@Module({
  controllers: [SneakerController],
  providers: [SneakerService, FileService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Sneaker.name,
        schema: SneakerSchema,
      },
    ]),
  ],
})
export class SneakerModule {}
