import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class BaseEntity {
  @ApiProperty({
    description: 'Created at',
    example: '2023-05-01T00:00:00.000Z',
    type: Date,
  })
  @Column('timestamp with time zone', { default: () => 'now()' })
  public createdAt!: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-05-01T00:00:00.000Z',
    type: Date,
  })
  @Column('timestamp with time zone', { default: () => 'now()' })
  public updatedAt!: Date;
}
