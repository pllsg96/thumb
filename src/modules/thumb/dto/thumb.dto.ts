import { IsNotEmpty, IsNumber, IsUrl, Min, Max } from 'class-validator';

export class ThumbDTO {
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'O valor mínimo permitido é 0.' })
  @Max(1, { message: 'O valor máximo permitido é 1.' })
  readonly compress: number;
}
