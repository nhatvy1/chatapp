import {
    IsNotEmpty,
    IsEmpty,
    MinLength,
    MaxLength,
    IsEmail,
  } from 'class-validator';
  
  export class RegisterDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    readonly fullName: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    readonly password: string;
  
    // @IsNotEmpty()
    // avatar: File;
  }