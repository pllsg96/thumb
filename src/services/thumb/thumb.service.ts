import { Injectable } from '@nestjs/common';
import { ThumbDTO } from 'src/DTO/thumb.dto';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as ExifParser from 'exif-parser';
const PATH = './path/to/';

const getMetaData = async () => {
  const imageBuffer = fs.readFileSync(`${PATH}imagem.jpg`);
  const parser = ExifParser.create(imageBuffer);
  const result = await parser.parse();

  const imageWidth = result.imageSize.width;
  const imageHeight = result.imageSize.height;
  console.log(imageWidth, imageHeight);

  const whoIs720 = imageWidth > imageHeight ? 1 : 0;
  const lessThan720 = imageWidth > 720 || imageHeight > 720;

  if (!lessThan720) makeA720copy();
};

const makeA720copy = () => {
  fs
}

@Injectable()
export class ThumbService {
  getEai(): string {
    return 'eai';
  }

  async compressThumb(newThumb: ThumbDTO): Promise<ThumbDTO> {
    const response = await fetch(newThumb.image);
    const buffer = await response.buffer();
    await fs.writeFile(`${PATH}imagem.jpg`, buffer, () => getMetaData());

    return newThumb;
  }
}
