import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateMessageDemoDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  text: string

  @IsNotEmpty()
  room: number

  @IsNotEmpty()
  owner: number
}
