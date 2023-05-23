import { Injectable } from '@nestjs/common';
import { ThumbDTO } from 'src/DTO/thumb.dto';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as ExifParser from 'exif-parser';
import Jimp from 'jimp';
const PATH = './path/to/';

const getMetaData = async (compress) => {
  const imageBuffer = fs.readFileSync(`${PATH}imagem.jpg`);
  const parser = ExifParser.create(imageBuffer);
  const result = await parser.parse();

  const imageWidth = result.imageSize.width;
  const imageHeight = result.imageSize.height;
  const lessThan720 = imageWidth > 720 || imageHeight > 720;

  if (!lessThan720) makeA720copy();
  else {
    Jimp.read(`${PATH}imagem.jpg`).then((image) => {
      if (imageWidth > imageHeight) image.resize(720, Jimp.AUTO);
      else image.resize(Jimp.AUTO, 720);
      image.quality(compress);
      image.writeAsync(`${PATH}imagem_thumb.jpg`);
    });
  }
};

const makeA720copy = () => {
  fs.copyFile(`${PATH}imagem.jpg`, `${PATH}imagem_thumb.jpg`, null);
};

@Injectable()
export class ThumbService {
  async compressThumb(newThumb: ThumbDTO): Promise<ThumbDTO> {
    const response = await fetch(newThumb.image);
    const buffer = await response.buffer();
    await fs.writeFile(`${PATH}imagem.jpg`, buffer, () =>
      getMetaData(newThumb.compress),
    );

    return newThumb;
  }
}
