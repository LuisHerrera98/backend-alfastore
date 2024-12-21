import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { SellService } from 'src/sell/sell.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly sellService: SellService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create({...createProductDto})
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
 
    const { name, price, cost, stock } = updateProductDto;
 
    const update: any = {};
    if (name) update.name = name;
    if (price) update.price = price;
    if (cost) update.cost = cost;
    if (stock) update.stock = stock;
 
    return this.productModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
  }

  async findAllBySizeId(sizeId: string, page: number = 1, limit: number = 8): Promise<any> {
    const skip = (page - 1) * limit;
   
    const [products, total] = await Promise.all([
      this.productModel.find({
        'stock': {
          $elemMatch: {
            'size_id': sizeId,
            'quantity': { $gt: 0 }
          }
        }
      })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean(),
      
      this.productModel.countDocuments({
        'stock': {
          $elemMatch: {
            'size_id': sizeId,
            'quantity': { $gt: 0 } 
          }
        }
      })
    ]);
   
    return {
      data: products.map(product => ({
        ...product,
        images: product.images.map((img: any) => ({
          url: img.url,
          publicId: img.publicId
        }))
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
   }

  async incrementQuantity(productId: string, sizeId: string) {
    const product = await this.productModel.findOneAndUpdate(
      { 
        _id: productId,
        'stock.size_id': sizeId
      },
      { 
        $inc: { 'stock.$.quantity': 1 }
      },
      { new: true }
    );

    if (!product) {
      throw new NotFoundException('Producto o talla no encontrada');
    }

    return product;
  }

  async decrementQuantity(productId: string, sizeId: string) {
    const product = await this.productModel.findOne({
      _id: productId,
      'stock.size_id': sizeId,
      'stock.quantity': { $gt: 0 }
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado o sin stock disponible');
    }

    const size = product.stock.find(s => s.size_id === sizeId);

    await this.sellService.registerSell({
      product_id: productId,
      product_name: product.name,
      size_id: sizeId,
      size_name: size.size_name,
      price: product.price,
      cost: product.cost,
      images: product.images
    });

    return this.productModel.findOneAndUpdate(
      { 
        _id: productId,
        'stock.size_id': sizeId,
        'stock.quantity': { $gt: 0 }
      },
      { 
        $inc: { 'stock.$.quantity': -1 }
      },
      { new: true }
    );
  }

  async getInversion(){
    try {
      const products = await this.productModel.find();
      
      const totalInversion = products.reduce((total, product) => {
        const stockValue = product.stock.reduce((acc, item) => {
          return acc + (item.quantity * product.cost);
        }, 0);
        return total + stockValue;
      }, 0);
   
      return {
        totalInversion,
        message: 'Cálculo exitoso'
      };
    } catch (error) {
      throw new BadRequestException('Error al calcular la inversión: ' + error.message);
    }
  }
}
