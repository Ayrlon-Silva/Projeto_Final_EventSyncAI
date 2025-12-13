import { PartialType } from '@nestjs/swagger'; // ou @nestjs/mapped-types
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
