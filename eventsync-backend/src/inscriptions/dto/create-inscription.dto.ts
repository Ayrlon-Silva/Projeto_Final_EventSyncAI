import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInscriptionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  eventId: string;
}
