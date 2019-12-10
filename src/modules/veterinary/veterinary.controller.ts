/**
 * Hapi/Joi models instead of interfaces for data validation
 * SyntaxError instead of NotFountException
 * Try catch for catch another error types
 */

import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { Response } from 'express';
@Controller('veterinary')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Get()
  // Find and return all veterinarians
  async findAll(@Res() res: Response) {
    try {
      const veterinarians = await this.veterinaryService.findAll();
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
  @Get(':name')
  // Find and return all veterinarians
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
  // Create a new veterinary
  async create(@Body() data: object, @Res() res: Response) {
    try {
      await this.veterinaryService.create(data);
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
  // Update veterinary by id
  async update(@Param('id') id: string, @Body() body: object, @Res() res: Response) {
    try {
      const veterinary = await this.veterinaryService.update(id, body);
      if (!veterinary) throw new SyntaxError('El veterinario no existe');
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
  // Delete veterinary by id
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const veterinary = await this.veterinaryService.delete(id);
      if (!veterinary) throw new SyntaxError('El veterinario no existe');
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
