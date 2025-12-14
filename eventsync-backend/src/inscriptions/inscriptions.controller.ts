import { Controller, Get, Post, Put, Param, UseGuards, Body } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('inscriptions')
@Controller() 
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  // 1. POST /events/:id/register
  @Post('events/:id/register')
  @ApiOperation({ summary: 'Solicitar inscrição (Cliente)' })
  create(@Param('id') eventId: string, @CurrentUser() user: any) {
    return this.inscriptionsService.create(eventId, user.userId);
  }

  // 2. GET /events/:id/inscriptions
  @Get('events/:id/inscriptions')
  @ApiOperation({ summary: 'Listar inscrições (Organizador)' })
  findAllByEvent(@Param('id') eventId: string, @CurrentUser() user: any) {
    return this.inscriptionsService.findAllByEvent(eventId, user.userId);
  }

  // 3. PUT /inscriptions/:id/approve
  @Put('inscriptions/:id/approve')
  @ApiOperation({ summary: 'Aprovar inscrição (Organizador)' })
  approve(@Param('id') id: string, @CurrentUser() user: any) {
    return this.inscriptionsService.approve(id, user.userId);
  }

  // 4. PUT /inscriptions/:id/reject
  @Put('inscriptions/:id/reject')
  @ApiOperation({ summary: 'Recusar inscrição (Organizador)' })
  reject(@Param('id') id: string, @CurrentUser() user: any) {
    return this.inscriptionsService.reject(id, user.userId);
  }

  // 5. PUT /inscriptions/:id/confirm-payment
  @Put('inscriptions/:id/confirm-payment')
  @ApiOperation({ summary: 'Confirmar pagamento (Organizador)' })
  confirmPayment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.inscriptionsService.confirmPayment(id, user.userId);
  }
}
