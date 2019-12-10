import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surnames: { type: String, required: true },
  phone: { type: String, required: true },
  veterinary_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true }
});

