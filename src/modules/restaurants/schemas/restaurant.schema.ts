import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  nameAr: string;

  @Prop({ required: true })
  nameEn: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length >= 1 && v.length <= 3,
      message: 'Cuisines must be between 1 and 3',
    },
  })
  cuisines: string[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: [Number],
}
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
RestaurantSchema.index({ location: '2dsphere' });