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
import { VeterinaryService } from './veterinary.service';
import { Response } from 'express';

// Websocket client
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

@Controller('veterinary')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Get(':name')
  async findByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const veterinarians = await this.veterinaryService.findByName(name);
      res.status(HttpStatus.OK).json({
        message: 'Veterinarios cargados',
        veterinarians
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
      await this.veterinaryService.create(data);
      // Websocket client emit
      socket.emit('veterinarians');
      res.status(HttpStatus.OK).json({
        message: 'Veterinario agregado'
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
      const veterinary = await this.veterinaryService.update(id, body);
      if (!veterinary) throw new SyntaxError('El veterinario no existe');
      // Websocket client emit
      socket.emit('veterinarians');
      res.status(HttpStatus.OK).json({
        message: 'Veterinario actualizado'
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
      const veterinary = await this.veterinaryService.delete(id);
      if (!veterinary) throw new SyntaxError('El veterinario no existe');
      // Websocket client emit
      socket.emit('veterinarians');
      res.status(HttpStatus.OK).json({
        message: 'Veterinario eliminado'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
}
