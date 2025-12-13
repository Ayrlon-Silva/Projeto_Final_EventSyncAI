import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: passwordHash,
      role: 'user',
      city: createUserDto.city,
      photoUrl: createUserDto.photoUrl,
      isParticipationVisible: createUserDto.isParticipationVisible, 
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'passwordHash', 'role'], 
    });
  }

  async update(id: string, updateUserDto: any) {
    delete updateUserDto.email;
    delete updateUserDto.password; 
    
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}