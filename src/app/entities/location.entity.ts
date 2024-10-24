import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Location extends BaseEntity {
  @ApiProperty({
    description: 'Location id',
    example: 'add583c8-18d3-4584-944c-de8ea693ba7a',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ApiProperty({
    description: 'Location building',
    example: 'A',
    type: String,
  })
  @Column('text')
  public building!: string;

  @ApiProperty({
    description: 'Location name',
    example: 'A 01',
    type: String,
  })
  @Column('text')
  public name!: string;

  @ApiProperty({
    description: 'Location number',
    example: 'A-01',
    type: String,
  })
  @Column('text')
  public number!: string;

  @ApiProperty({
    description: 'Location area',
    example: '888.888',
    type: String,
  })
  @Column('text')
  public area!: string;

  @ApiProperty({
    description: 'Location parent id',
    example: 'add583c8-18d3-4584-944c-de8ea693ba7a',
    type: String,
  })
  @Column('uuid', { nullable: true })
  public parentId!: string | null;

  @ManyToOne(() => Location, category => category.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  public parent!: Location;

  @OneToMany(() => Location, category => category.parent)
  public children!: Location[];
}

export class LocationAction extends OmitType(Location, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
