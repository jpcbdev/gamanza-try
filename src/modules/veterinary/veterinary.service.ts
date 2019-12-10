/**
 * All functions inside controller try catch block
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import Validation from '../../validations/veterinary';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VeterinaryService {
  constructor(@InjectModel('Veterinary') private readonly veterinaryModel: Model<any>) {}

  async findAll() {
    return await this.veterinaryModel.find();
  }
  async findByName(name: string) {
    // Regular expression as SQL like
    return await this.veterinaryModel.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } });
  }
  async create(data: object) {
    await Validation.create.validateAsync(data);
    const newVeterinary = new this.veterinaryModel(data);
    await newVeterinary.save();
  }
  async update(_id: any, data: object) {
    await Validation.update.validateAsync(data);
    return await this.veterinaryModel.findOneAndUpdate({ _id }, data);
  }
  async delete(_id: string) {
    return await this.veterinaryModel.findOneAndDelete({ _id });
  }
}
