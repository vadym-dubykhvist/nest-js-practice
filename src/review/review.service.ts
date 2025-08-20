import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from 'generated/prisma';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = await this.prismaService.review.create({data: { text, rating, movie: {
      connect: {
        id: movieId
      }
    } }});

    return review;
  }
}
