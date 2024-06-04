import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SizeModule } from './size/size.module';

@Module({
  imports: [
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Lucho:mision2017@db-alfastore.dknyvyl.mongodb.net/db_alfastore',
    ),
    CategoryModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
