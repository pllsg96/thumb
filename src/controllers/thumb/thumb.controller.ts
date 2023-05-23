import { Controller, Get, Post, Body } from '@nestjs/common';
import { ThumbDTO } from 'src/DTO/thumb.dto';
import { ThumbService } from 'src/services/thumb/thumb.service';

@Controller('image')
export class ThumbController {
  constructor(private readonly thumbService: ThumbService) {}

  @Get()
  getEai(): string {
    return this.thumbService.getEai();
  }

  @Post('save')
  async compressThumb(@Body() newThumb: ThumbDTO): Promise<ThumbDTO> {
    return this.thumbService.compressThumb(newThumb);
  }
}
