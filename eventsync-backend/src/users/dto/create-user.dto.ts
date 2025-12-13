import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  photoUrl?: string; 

  @IsBoolean()
  @IsOptional()
  isParticipationVisible?: boolean; 
}