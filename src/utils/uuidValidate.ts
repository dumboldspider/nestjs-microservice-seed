import { BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

export const uuidValidate = (uuid: string): boolean => {
  if (!validate(uuid)) {
    throw new BadRequestException('Invalid UUID');
  }
  return true;
};
