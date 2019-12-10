// App
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// Veterinary
import { VeterinarySchema } from './schemas/Veterinary';
import { VeterinaryService } from './veterinary/veterinary.service';
import { VeterinaryController } from './veterinary/veterinary.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/veterinary', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    }),
    MongooseModule.forFeature([{ name: 'Veterinary', schema: VeterinarySchema, collection: 'veterinary' }])
  ],
  controllers: [AppController, VeterinaryController],
  providers: [AppService, VeterinaryService]
})
export class AppModule {}
