/**
 * All functions inside controller try catch block
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import Validation from '../validations/customer';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<any>,
    @InjectModel('Veterinary') private readonly veterinaryModel: Model<any>
  ) {}

  async findAll() {
    return await this.customerModel.find();
  }
  async findByName(name: string) {
    // Regular expression as SQL like
    return await this.customerModel.find({
      name: { $regex: '.*' + name + '.*', $options: 'i' }
    });
  }
  async create(data: any) {
    await Validation.create.validateAsync(data);

    const veterinary = await this.veterinaryModel.findById({
      _id: data.veterinary_id
    });

    if (!veterinary) throw new SyntaxError('El veterinario no existe');

    const newCustomer = new this.customerModel(data);
    await newCustomer.save();
  }
  async update(_id: any, data: object) {
    await Validation.update.validateAsync(data);
    return await this.customerModel.findOneAndUpdate({ _id }, data);
  }
  async delete(_id: string) {
    return await this.customerModel.findOneAndDelete({ _id });
  }
}
