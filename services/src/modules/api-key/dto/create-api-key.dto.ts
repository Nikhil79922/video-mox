/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;
}
