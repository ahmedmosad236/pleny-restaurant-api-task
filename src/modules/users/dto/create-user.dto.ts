import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Full name of the user' })
  fullName: string;

  @IsArray()
  @ApiProperty({ description: 'List of favorite cuisines', type: [String] })
  favoriteCuisines: string[];
}
