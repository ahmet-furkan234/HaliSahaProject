import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export interface IRoleDto {
  roleId?: string;
  roleName: string;
}


export interface IAssignRoleDto {
  userId: string;
  roleId: string;
}
export interface IUnassignRoleDto {
  userId: string;
  roleId?: string;
}

export interface ICreateRoleDto {
  name: string;
}

export interface IUpdateRoleDto {
  name?: string;
}

export class UpdateRoleDto implements IUpdateRoleDto {
  @IsOptional()
  @IsString({ message: 'Rol adı metin formatında olmalıdır' })
  @MinLength(2, { message: 'Rol adı en az 2 karakter olmalıdır' })
  @MaxLength(30, { message: 'Rol adı en fazla 30 karakter olmalıdır' })
  name?: string;
}

export class CreateRoleDto implements ICreateRoleDto {
  @IsNotEmpty({ message: 'Rol adı boş olamaz' })
  @IsString({ message: 'Rol adı metin formatında olmalıdır' })
  @MinLength(2, { message: 'Rol adı en az 2 karakter olmalıdır' })
  @MaxLength(30, { message: 'Rol adı en fazla 30 karakter olmalıdır' })
  name!: string;
}


export class UnassignRoleDto implements IUnassignRoleDto {
  @IsNotEmpty({ message: 'Kullanıcı kimliği boş olamaz' })
  @IsString({ message: 'Kullanıcı kimliği metin formatında olmalıdır' })
  userId!: string;

  @IsOptional()
  @IsString({ message: 'Rol kimliği metin formatında olmalıdır' })
  roleId?: string;
}

export class AssignRoleDto implements IAssignRoleDto {
  @IsNotEmpty({ message: 'Kullanıcı kimliği boş olamaz' })
  @IsString({ message: 'Kullanıcı kimliği metin formatında olmalıdır' })
  userId!: string;

  @IsNotEmpty({ message: 'Rol kimliği boş olamaz' })
  @IsString({ message: 'Rol kimliği metin formatında olmalıdır' })
  roleId!: string;
}


@Exclude()
export class RoleDto implements IRoleDto {
  @Expose({ name: "_id" })
  roleId?: string;

  @Expose({ name: "name" })
  roleName!: string;
}


