import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Film } from './films.entity';

@Entity()
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array')
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @RelationId((schedule: Schedule) => schedule.film)
  filmId: string;
}
