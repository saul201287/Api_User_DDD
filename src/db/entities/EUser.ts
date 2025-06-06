import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class EUser {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  first_name?: string;

  @Column({ type: "varchar", length: 255 })
  last_name?: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email?: string;

  @Column({ type: "varchar", length: 255 })
  password?: string;

  @Column({ type: "varchar", length: 255, unique: true })
  phone?: string;

  @Column({ type: "varchar", length: 50})
  rol?:string;

  @Column({ type: "bool", default: false })
  is_verified?: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
