import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { CategoryAndSizeId } from './dto/category-and-size-id.dto';
import { UpdateSizeDto } from 'src/size/dto/update-size.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ){}

  async create(createProductDto: CreateProductDto) {
    try {
      createProductDto.stock = JSON.parse(createProductDto.stock).map((item) => ({
        ...item,
        cuantity: parseInt(item.cuantity) || 0,
      }));
      const product = await this.productModel.create({
        name: createProductDto.name,
        cost: createProductDto.cost,
        price: createProductDto.price,
        category_id: createProductDto.category_id,
        image: createProductDto.image,
        stock: createProductDto.stock
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create category - Check server logs`,
      );
    }
  }

  async getProductBySizeAndCategory(categoryAndSizeId: CategoryAndSizeId) {
    const products = await this.productModel.find(
      {
        category_id: categoryAndSizeId.category_id,
        "stock.id": categoryAndSizeId.size_id,
      },
      {
        _id: 1,
        name: 1,
        category_id: 1,
        image: 1,
        price: 1,
        cost: 1,
        "stock.$": 1,
      }
    );

    const productStock = products.filter((product) => {
      return product.stock.some((item) => item.cuantity > 0);
    });
    
    return productStock;
  }

  async sizeDecrement(updateSizeDto: UpdateSizeDto) {
    try {
      const sizeStock = await this.productModel.updateOne(
        {
          _id: updateSizeDto.product_id,
          "stock.id": updateSizeDto.size_id
        },
        {
          $inc: {
            "stock.$.cuantity": -1
          }
        }
      );
      return sizeStock;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't decrement size stock - Check server logs`,
      );
    }
  }

  async sizeIncrement(updateSizeDto: UpdateSizeDto) {
    try {
      const sizeStock = await this.productModel.updateOne(
        {
          _id: updateSizeDto.product_id,
          "stock.id": updateSizeDto.size_id
        },
        {
          $inc: {
            "stock.$.cuantity": +1
          }
        }
      );
      return sizeStock;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't decrement size stock - Check server logs`,
      );
    }
  }
 
}
