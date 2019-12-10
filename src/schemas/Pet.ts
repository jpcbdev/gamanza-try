import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});
