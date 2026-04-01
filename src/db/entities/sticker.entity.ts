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
import { AccountSticker } from './account-sticker.entity';
import { Album } from './album.entity';
import { Country } from './country.entity';
import { LolRole } from './lolrole.entity';
import { StickerType } from './sticker-type.entity';
import { Team } from './team.entity';

@Entity({ name: 'sticker' })
export class Sticker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  date: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ name: 'country_id' })
  countryId: string;

  @ManyToOne(() => Country, (country) => country.stickers)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'team_id' })
  teamId: string;

  @ManyToOne(() => Team, (team) => team.stickers)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'sticker_type_id' })
  stickerTypeId: string;

  @ManyToOne(() => StickerType, (stickerType) => stickerType.stickers)
  @JoinColumn({ name: 'sticker_type_id' })
  stickerType: StickerType;

  @Column({ name: 'album_id' })
  albumId: string;

  @ManyToOne(() => Album, (album) => album.stickers)
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @Column({ name: 'lolrole_id' })
  lolRoleId: string;

  @ManyToOne(() => LolRole, (lolRole) => lolRole.stickers)
  @JoinColumn({ name: 'lolrole_id' })
  lolRole: LolRole;

  @OneToMany(() => AccountSticker, (accountSticker) => accountSticker.sticker)
  accountStickers: AccountSticker[];
}
