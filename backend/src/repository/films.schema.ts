import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Schedule {
  @Prop()
  id: string;

  @Prop()
  daytime: Date;

  @Prop()
  event: string;

  @Prop()
  hall: number;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop([String])
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true, type: [String] })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [ScheduleSchema], required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
