import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  // POST /events
  async create(createEventDto: CreateEventDto, user: any) {

    if (user.role !== 'organizer') {
      throw new ForbiddenException('Apenas usuários com perfil de Organizador podem criar eventos.');
    }

    const event = this.eventRepository.create({
      ...createEventDto,
      organizerId: user.userId, 
      status: 'draft',
      areRegistrationsOpen: false,
    });

    return this.eventRepository.save(event);
  }

  // GET /events
  async findAll() {
    return this.eventRepository.find({
      where: { status: 'published' },
      relations: ['organizer'],
      order: { dateStart: 'ASC' },
    });
  }

// GET /myevents
  async findMyEvents(userId: string) {
    return this.eventRepository.find({
      where: { organizerId: userId },
      order: { dateStart: 'DESC' }, 
    });
  }

  // GET /events/:id
  async findOne(id: string) {
    const event = await this.eventRepository.findOne({ 
      where: { id },
      relations: ['organizer'] 
    });
    if (!event) throw new NotFoundException('Evento não encontrado');
    return event;
  }

  // PUT /events/:id
  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.findOne(id);
    
    if (event.organizerId !== userId) {
      throw new ForbiddenException('Somente o Organizador do evento pode edita-lo');
    }

    await this.eventRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  // POST /events/:id/publish
  async publish(id: string, userId: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId) throw new ForbiddenException();

    event.status = 'published';
    return this.eventRepository.save(event);
  }

  // POST /events/:id/open-inscriptions
  async openInscriptions(id: string, userId: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId) throw new ForbiddenException();

    event.areRegistrationsOpen = true;
    return this.eventRepository.save(event);
  }

  // POST /events/:id/close-inscriptions
  async closeInscriptions(id: string, userId: string) {
    const event = await this.findOne(id);
    if (event.organizerId !== userId) throw new ForbiddenException();

    event.areRegistrationsOpen = false;
    return this.eventRepository.save(event);
  }
}