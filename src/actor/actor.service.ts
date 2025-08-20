import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/createActor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Actor } from 'generated/prisma';

@Injectable()
export class ActorService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;

    const actor = await this.prismaService.actor.create({
      data: {
        name
      }
    })

    return actor;
  }
}
