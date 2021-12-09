import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
