import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { VeterinaryService } from './modules/veterinary/veterinary.service';
import { CustomerService } from './modules/customer/customer.service';
import { PetService } from './modules/pet/pet.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private readonly veterinaryService: VeterinaryService,
    private readonly customerService: CustomerService,
    private readonly petService: PetService
  ) {}

  @SubscribeMessage('veterinarians')
  async handleVeterinarians() {
    const veterinarians = await this.veterinaryService.findAll();
    this.server.emit('veterinarians', veterinarians);
  }
  @SubscribeMessage('customers')
  async handleCustomers() {
    const customers = await this.customerService.findAll();
    this.server.emit('customers', customers);
  }
  @SubscribeMessage('pets')
  async handlePets() {
    const pets = await this.petService.findAll();
    this.server.emit('pets', pets);
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect() {
    this.logger.log(`Client disconnected`);
  }

  handleConnection() {
    this.logger.log(`Client connected`);
  }
}
