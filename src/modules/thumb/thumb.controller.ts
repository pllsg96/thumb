import { Controller, Post, Body } from '@nestjs/common';
import { ThumbService } from './thumb.service';
import { ThumbDTO } from './dto/thumb.dto';

@Controller('image')
export class ThumbController {
  constructor(private readonly _thumbService: ThumbService) {}

  @Post('save')
  async compressThumb(@Body() newThumb: ThumbDTO): Promise<ThumbDTO> {
    return this._thumbService.compressThumb(newThumb);
  }
}
