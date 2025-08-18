import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/createActor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() dto: CreateActorDto) {
    this.actorService.create(dto);
  }
}
