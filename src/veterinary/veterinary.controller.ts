/**
 * Using Hapi/Joi models instead of interfaces for data validation
 */
import { Controller, Post, Get, Put, Delete, Req, HttpException, Param, Body } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';

@Controller('veterinary')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Get()
  findAll() {
    try {
      return this.veterinaryService.findAll();
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
  @Post()
  async create(@Body() data: object) {
    try {
      await this.veterinaryService.create(data);
      return 'Veterinario agregado';
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, 400);
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object) {
    try {
      if (!(await this.veterinaryService.update(id, body))) throw new SyntaxError('El veterinario no existe');
      return 'Veterinario actualizado';
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      if (!(await this.veterinaryService.delete(id))) throw new SyntaxError('El veterinario no existe');
      return 'Veterinario eliminado';
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}
