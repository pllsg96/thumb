import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThumbService } from './thumb.service';
import { ThumbController } from './thumb.controller';
import { ThumbModel } from 'src/database/schemas/thumb.schema';

@Module({
  imports: [MongooseModule.forFeature([ThumbModel])],
  providers: [ThumbService],
  controllers: [ThumbController],
})
export class ThumbModule {}
