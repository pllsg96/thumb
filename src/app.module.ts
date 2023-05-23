import { Module } from '@nestjs/common';
import { ThumbService } from './services/thumb/thumb.service';
import { ThumbController } from './controllers/thumb/thumb.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/image')],
  controllers: [ThumbController],
  providers: [ThumbService],
})
export class AppModule {}
