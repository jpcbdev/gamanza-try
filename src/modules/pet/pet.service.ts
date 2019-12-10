/**
 * All functions inside controller try catch block
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import Validation from '../../validations/pet';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Pet') private readonly petModel: Model<any>,
    @InjectModel('Customer') private readonly customerModel: Model<any>
  ) {}

  async findAll() {
    return await this.petModel.find();
  }
  async findByName(name: string) {
    // Regular expression as SQL like
    return await this.petModel.find({
      name: { $regex: '.*' + name + '.*', $options: 'i' }
    });
  }
  async create(data: any) {
    await Validation.create.validateAsync(data);
    const customer = await this.customerModel.findById({
      _id: data.customer_id
    });
    if (!customer) throw new SyntaxError('El cliente no existe');
    const newPet = new this.petModel(data);
    await newPet.save();
  }
  async update(_id: any, data: object) {
    await Validation.update.validateAsync(data);
    return await this.petModel.findOneAndUpdate({ _id }, data);
  }

  async delete(_id: string) {
    return await this.petModel.findOneAndDelete({ _id });
  }
}
