import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateBrokerDto {
  @IsString()
  public name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(13)
  public documentNumber: string;
  
}
