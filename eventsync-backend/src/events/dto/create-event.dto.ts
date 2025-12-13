import { IsString, IsNotEmpty, IsDateString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString() // Valida se é uma data válida (ISO 8601)
  dateStart: string;

  @IsDateString()
  dateEnd: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isManualApproval?: boolean;

  @IsString()
    @IsOptional()
    bannerUrl?: string;
}
