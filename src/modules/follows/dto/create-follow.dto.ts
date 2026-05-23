import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User ID who is following' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Restaurant ID being followed' })
  restaurantId: string;
}
