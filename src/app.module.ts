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
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: 'Veterinary', schema: VeterinarySchema, collection: 'veterinary' }
    ])
  ],
  controllers: [AppController, VeterinaryController],
  providers: [AppService, VeterinaryService]
})
export class AppModule {}
