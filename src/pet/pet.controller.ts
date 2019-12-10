/**
 * Hapi/Joi models instead of interfaces for data validation
 * SyntaxError instead of NotFountException
 * Try catch for catch another error types
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

@Controller('Pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  // Find and return all pets
  async findAll(@Res() res: Response) {
    try {
      const pets = await this.petService.findAll();
      res.status(HttpStatus.OK).json({ message: 'Mascotas cargadas', pets });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Get(':name')
  // Find pets by name
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
  // Create a new pet
  async create(@Body() data: object, @Res() res: Response) {
    try {
      await this.petService.create(data);
      res.status(HttpStatus.OK).json({ message: 'Mascota agregada' });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  @Put(':id')
  // Update a pet by id
  async update(
    @Param('id') id: string,
    @Body() data: object,
    @Res() res: Response
  ) {
    try {
      const pet = await this.petService.update(id, data);
      if (!pet) throw new SyntaxError('La mascota no existe');
      res.status(HttpStatus.OK).json({
        message: 'Mascota actualizada'
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      });
    }
  }
  // Delete a pet by id
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const pet = await this.petService.delete(id);
      if (!pet) throw new SyntaxError('La mascota no existe');
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
