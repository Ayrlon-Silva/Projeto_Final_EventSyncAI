import { Controller, Post, Body, Get, Param, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //  1. GET /users/me - Pega os dados do usuário LOGADO
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findOne(user.userId);
  }

  // 2. PUT /users/me - Atualiza os dados do usuário LOGADO
  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateProfile(@CurrentUser() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.userId, updateUserDto);
  }

  // 3. GET /users/:id - Perfil Público
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}