import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThumbModule } from './modules/thumb/thumb.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/'), ThumbModule],
})
export class AppModule {}
