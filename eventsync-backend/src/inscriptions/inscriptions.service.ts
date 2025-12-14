import { Injectable, NotFoundException, BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscription, InscriptionStatus } from './entities/inscription.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class InscriptionsService {
  constructor(
    @InjectRepository(Inscription)
    private inscriptionRepository: Repository<Inscription>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  // 1. POST /events/:id/register (Cliente solicita)
  async create(eventId: string, userId: string) {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) throw new NotFoundException('Evento não encontrado');

    if (!event.areRegistrationsOpen) {
      throw new BadRequestException('Inscrições fechadas.');
    }

    const existing = await this.inscriptionRepository.findOne({ where: { userId, eventId } });
    if (existing) throw new ConflictException('Já inscrito.');

    const total = await this.inscriptionRepository.count({ where: { eventId, status: InscriptionStatus.APPROVED } });
    if (total >= event.maxParticipants) {
      throw new BadRequestException('Evento lotado.');
    }

    const inscription = this.inscriptionRepository.create({
      userId,
      eventId,
      status: InscriptionStatus.PENDING,
    });

    return this.inscriptionRepository.save(inscription);
  }

  // 2. GET /events/:id/inscriptions
  async findAllByEvent(eventId: string, userId: string) {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) throw new NotFoundException('Evento não encontrado');
    
    return this.inscriptionRepository.find({
      where: { eventId },
      relations: ['user'],
      order: { registeredAt: 'DESC' },
    });
  }


  private async findInscriptionAndCheckOrganizer(inscriptionId: string, userId: string) {
    const inscription = await this.inscriptionRepository.findOne({
      where: { id: inscriptionId },
      relations: ['event'], 
    });

    if (!inscription) throw new NotFoundException('Inscrição não encontrada');
    
    if (inscription.event.organizerId !== userId) {
      throw new ForbiddenException('Apenas o organizador do evento pode gerenciar esta inscrição.');
    }
    return inscription;
  }

  // 3. PUT /inscriptions/:id/approve
  async approve(id: string, userId: string) {
    const inscription = await this.findInscriptionAndCheckOrganizer(id, userId);
    inscription.status = InscriptionStatus.APPROVED;
    return this.inscriptionRepository.save(inscription);
  }

  // 4. PUT /inscriptions/:id/reject
  async reject(id: string, userId: string) {
    const inscription = await this.findInscriptionAndCheckOrganizer(id, userId);
    inscription.status = InscriptionStatus.REJECTED;
    return this.inscriptionRepository.save(inscription);
  }

  // 5. PUT /inscriptions/:id/confirm-payment
  async confirmPayment(id: string, userId: string) {
    const inscription = await this.findInscriptionAndCheckOrganizer(id, userId);
    inscription.status = InscriptionStatus.PAID;
    inscription.paymentDate = new Date(); 
    return this.inscriptionRepository.save(inscription);
  }
}