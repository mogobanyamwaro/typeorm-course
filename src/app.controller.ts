import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): Promise<User[]> {
    return this.appService.getAll();
  }
  @Get(':id')
  getOneUser(@Param('id') id: number): Promise<User> {
    return this.appService.getOne(id);
  }
  @Post()
  createUser(@Body() createuserdto: createUserDto): Promise<User> {
    return this.appService.createUser(createuserdto);
  }
  @Put(':id')
  updateUser(
    @Body() updteuserdto: createUserDto,
    @Param('id') id: number,
  ): Promise<User> {
    return this.updateUser(updteuserdto, id);
  }
}
