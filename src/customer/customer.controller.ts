/**
 * Hapi/Joi models instead of interfaces for data validation
 * SyntaxError instead of NotFountException
 * Try catch for catch another error types
 */

import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  // Find and return all customers
  async findAll(@Res() res: Response) {
    try {
      const customers = await this.customerService.findAll();
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
  @Get(':name')
  // Find and return customers by name
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
  // Create a new customer
  async create(@Body() data: object, @Res() res: Response) {
    try {
      await this.customerService.create(data);
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
  // Update customer by id
  async update(@Param('id') id: string, @Body() body: object, @Res() res: Response) {
    try {
      const customer = await this.customerService.update(id, body);
      if (!customer) throw new SyntaxError('El Clente no existe');
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
  // Delete customer by id
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const customer = await this.customerService.delete(id);
      if (!customer) throw new SyntaxError('El Cliente no existe');
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
