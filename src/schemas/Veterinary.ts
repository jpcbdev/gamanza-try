import * as mongoose from 'mongoose';

export const VeterinarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  surnames: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true }
});
