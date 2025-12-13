import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relacionamento: Muitos Eventos pertencem a Um Usuário (Organizador)
  @ManyToOne(() => User, { eager: true }) // eager: true traz os dados do dono junto quando buscarmos o evento
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @Column()
  organizerId: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column()
  location: string; // Pode ser endereço ou Link

  @Column({ nullable: true })
  maxParticipants: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'float', default: 0 })
  price: number;

  // Status do evento: 'draft' (rascunho), 'published' (publicado), 'finished' (finalizado)
  @Column({ default: 'draft' })
  status: string;

  // Controle de inscrições
  @Column({ default: true })
  isManualApproval: boolean;

  @Column({ default: true })
  areRegistrationsOpen: boolean;

  @Column({ nullable: true })
  bannerUrl: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
