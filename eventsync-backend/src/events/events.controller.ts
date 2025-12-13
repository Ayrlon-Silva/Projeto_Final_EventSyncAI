import { Controller, Get, Post, Body, Param, Put, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 1. POST /events - Criar evento (organizador) 
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar evento (Requer role: organizer)' })
  create(@Body() createEventDto: CreateEventDto, @CurrentUser() user: any) {
    return this.eventsService.create(createEventDto, user);
  }

  // 2. GET /events - Listar eventos públicos 
  @Get()
  @ApiOperation({ summary: 'Listar eventos públicos' })
  findAll() {
    return this.eventsService.findAll();
  }

  // GET / my-events - Lista de Eventos do Organizador
  @Get('my-events') 
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar eventos do organizador logado' })
  findMyEvents(@CurrentUser() user: any) {
    return this.eventsService.findMyEvents(user.userId);
  }

  // 3. GET /events/:id - Detalhes do evento 
  @Get(':id')
  @ApiOperation({ summary: 'Detalhes do evento' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // 4. PUT /events/:id - Editar evento (organizador) 
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar evento' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @CurrentUser() user: any) {
    return this.eventsService.update(id, updateEventDto, user.userId);
  }

  // 5. POST /events/:id/publish - Publicar 
  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar evento (muda status para published)' })
  publish(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.publish(id, user.userId);
  }

  // 6. POST /events/:id/open-inscriptions - Abrir inscrições 
  @Post(':id/open-inscriptions')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Abrir inscrições manualmente' })
  openInscriptions(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.openInscriptions(id, user.userId);
  }

  // 7. POST /events/:id/close-inscriptions - Fechar inscrições 
  @Post(':id/close-inscriptions')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fechar inscrições' })
  closeInscriptions(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.closeInscriptions(id, user.userId);
  }
}