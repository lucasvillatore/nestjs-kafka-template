import { IsDefined, IsString } from 'class-validator';

export class ExampleDTO {
  @IsDefined()
  @IsString()
  eventName: string;

  @IsDefined()
  @IsString()
  data: string;
}
