import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ERROR_MESSAGE } from '@shared/constants';
import { isValidObjectId } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(ERROR_MESSAGE.ID_INVALID);
    }

    return value;
  }
}
