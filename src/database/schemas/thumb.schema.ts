import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThumbDocument = Thumb & Document;

@Schema()
export class Thumb {
  @Prop({
    type: String,
  })
  id?: string;

  @Prop({
    type: Object,
  })
  metadata?: object;
}

export const ThumbSchema = SchemaFactory.createForClass(Thumb);

export const ThumbModel = {
  name: Thumb.name,
  schema: ThumbSchema,
} as ModelDefinition;
