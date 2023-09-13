import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thumb, ThumbDocument } from 'src/database/schemas/thumb.schema';
import { ThumbDTO } from './dto/thumb.dto';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as ExifParser from 'exif-parser';
import * as Jimp from 'jimp';
const PATH = './path/to';

@Injectable()
export class ThumbService {
  constructor(
    @InjectModel(Thumb.name)
    private _thumbSchema: Model<ThumbDocument>,
  ) {}

  async fetchImage(url: string): Promise<Buffer> {
    const response = await fetch(url);
    const buffer = await response.buffer();
    return buffer;
  }

  async writeFile(buffer: Buffer, sufix?: string): Promise<void> {
    const fileName = sufix ? `imagem_${sufix}.jpg` : `imagem.jpg`;

    if (!fs.existsSync(PATH)) {
      fs.mkdirSync(PATH, { recursive: true });
    }

    await fs.writeFile(`${PATH}/${fileName}`, buffer, () => {
      // console.log('imagem salva' );
    });
  }

  async getMetadata(buffer: Buffer): Promise<any> {
    const metadata = ExifParser.create(buffer).parse();
    return metadata;
  }

  async compressThumb(newThumb: ThumbDTO): Promise<any> {
    const buffer = await this.fetchImage(newThumb.image);
    await this.writeFile(buffer);
    const meta = await this.getMetadata(buffer);
    if (!meta) {
      throw new Error('Erro ao obter metadados da imagem');
    }
    await this.resizeImage(buffer, newThumb.compress, meta.imageSize);
    try {
      const info = await this.saveMetadata(meta);
      console.log(info, meta);
      return {
        localpath: {
          original: `${PATH}/imagem.jpg`,
          thumb: `${PATH}/imagem_thumb.jpg`,
        },
        metadata: {
          meta,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async resizeImage(
    buffer: Buffer,
    compress: number,
    imageSize: { width: number; height: number },
  ): Promise<void> {
    const imageWidth = imageSize.width;
    const imageHeight = imageSize.height;
    const isBiggerThen720 = imageWidth > 720 || imageHeight > 720;

    if (!isBiggerThen720) {
      return this.writeFile(buffer, 'thumb');
    }

    await Jimp.read(buffer).then(async (image) => {
      if (imageWidth > imageHeight) image.resize(720, Jimp.AUTO);
      else image.resize(Jimp.AUTO, 720);

      image.quality(+compress * 100);
      const newBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
      this.writeFile(newBuffer, 'thumb');
    });
  }

  async saveMetadata(metadata: any): Promise<Thumb> {
    return await this._thumbSchema.create({
      metadata,
      id: uuidv4(),
    });
  }
}
