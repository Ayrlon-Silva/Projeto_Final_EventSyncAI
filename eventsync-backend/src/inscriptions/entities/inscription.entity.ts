import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

// Enum para padronizar os status
export enum InscriptionStatus {
  PENDING = 'pending',     
  APPROVED = 'approved',   
  REJECTED = 'rejected',   
  PAID = 'paid',
}

@Entity()
export class Inscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  registeredAt: Date; // timestamp_inscricao

  @Column({ type: 'enum', enum: InscriptionStatus, default: InscriptionStatus.PENDING })
  status: string; // status

  @Column({ nullable: true })
  paymentDate: Date; // timestamp_pagamento 

  @Column({ default: 0 })
  checkinCount: number; // n_checkins_realizados

  @Column({ default: false })
  certificateIssued: boolean; // certificado_emitido (bool)


  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  userId: string; 

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;

  @Column()
  eventId: string; 
}