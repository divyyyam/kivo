export class UserEntity {
  id!: string;
  username!: string;
  email!: string;
  passwordHash!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
