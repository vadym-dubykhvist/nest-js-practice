import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieRequest } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from 'generated/prisma';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable) throw new NotFoundException();

    return movie;
  }

  async create(dto: CreateMovieRequest): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Actors not found');

    const movie = this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => {
            return {
              id: actor.id,
            };
          }),
        },
      },
    });
    return await movie;
  }

  async update(id: string, dto: CreateMovieRequest): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => {
            return {
              id: actor.id,
            };
          }),
        },
      },
    });

    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);

    await this.prismaService.movie.delete({
      where: {
        id: movie.id,
      },
    });

    return 'Deleted ' + movie.id;
  }
}
