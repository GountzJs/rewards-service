import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Sticker } from './sticker.entity';

@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @Column()
  seed: string;

  @OneToMany(() => Sticker, (sticker) => sticker.team)
  stickers: Sticker[];

  @ManyToOne(() => Country, (country) => country.teams)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
