import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  @IsOptional()
  authorId: string;
}
