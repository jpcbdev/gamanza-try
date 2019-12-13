/**
 * Hapi/Joi models instead of interfaces for data validation
 * SyntaxError instead of NotFountException
 * Try catch for catch another error types
 * Create, update and delete actions reload db data using websockets client
 */

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  Res
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';

// Websocket client
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':name')
  async findByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const customers = await this.customerService.findByName(name);
      res.status(HttpStatus.OK).json({
        message: 'Clientes cargados',
        customers
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Post()
  async create(@Body() data: object, @Res() res: Response) {
    try {
      await this.customerService.create(data);
      // Websocket client emit
      socket.emit('customers');
      res.status(HttpStatus.OK).json({
        message: 'Cliente agregado'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: object,
    @Res() res: Response
  ) {
    try {
      const customer = await this.customerService.update(id, body);
      if (!customer) throw new SyntaxError('El Clente no existe');
      // Websocket client emit
      socket.emit('customers');
      res.status(HttpStatus.OK).json({
        message: 'Cliente actualizado'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const customer = await this.customerService.delete(id);
      if (!customer) throw new SyntaxError('El Cliente no existe');
      // Websocket client emit
      socket.emit('customers');
      res.status(HttpStatus.OK).json({
        message: 'Cliente eliminado'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
}
