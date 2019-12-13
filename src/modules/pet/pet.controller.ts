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
  Res,
  HttpStatus,
  Param,
  Body
} from '@nestjs/common';
import { Response } from 'express';
import { PetService } from './pet.service';

// Websocket client
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

@Controller('Pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get(':name')
  async findByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const pets = await this.petService.findByName(name);
      res.status(HttpStatus.OK).json({ message: 'Mascotas cargadas', pets });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Post()
  async create(@Body() data: object, @Res() res: Response) {
    try {
      await this.petService.create(data);
      // Websocket client emit
      socket.emit('pets');
      res.status(HttpStatus.OK).json({ message: 'Mascota agregada' });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: object,
    @Res() res: Response
  ) {
    try {
      const pet = await this.petService.update(id, data);
      if (!pet) throw new SyntaxError('La mascota no existe');
      // Websocket client emit
      socket.emit('pets');
      res.status(HttpStatus.OK).json({
        message: 'Mascota actualizada'
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
      const pet = await this.petService.delete(id);
      if (!pet) throw new SyntaxError('La mascota no existe');
      // Websocket client emit
      socket.emit('pets');
      res.status(HttpStatus.OK).json({
        message: 'Mascota eliminada'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
}
