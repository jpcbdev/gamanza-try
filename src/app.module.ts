// App
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// Veterinary
import { VeterinarySchema } from './schemas/Veterinary';
import { VeterinaryService } from './modules/veterinary/veterinary.service';
import { VeterinaryController } from './modules/veterinary/veterinary.controller';

// Customer
import { CustomerSchema } from './schemas/Customer';
import { CustomerService } from './modules/customer/customer.service';
import { CustomerController } from './modules/customer/customer.controller';

// Pet
import { PetSchema } from './schemas/Pet';
import { PetService } from './modules/pet/pet.service';
import { PetController } from './modules/pet/pet.controller';

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
    MongooseModule.forFeature([
      {
        name: 'Veterinary',
        schema: VeterinarySchema,
        collection: 'veterinary'
      },
      {
        name: 'Customer',
        schema: CustomerSchema,
        collection: 'customer'
      },
      {
        name: 'Pet',
        schema: PetSchema,
        collection: 'pet'
      }
    ])
  ],
  controllers: [
    AppController,
    VeterinaryController,
    CustomerController,
    PetController
  ],
  providers: [AppService, VeterinaryService, CustomerService, PetService]
})
export class AppModule {}
