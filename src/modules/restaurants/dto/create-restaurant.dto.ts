import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Restaurant name in Arabic' })
  nameAr: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Restaurant name in English' })
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Unique slug for the restaurant' })
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty({ description: 'List of cuisines (1-3 items)', type: [String], example: ['Egyptian', 'Fast Food'] })
  cuisines: string[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ description: 'Location coordinates [longitude, latitude]', type: [Number], example: [31.2357, 30.0444] })
  location: number[];
}