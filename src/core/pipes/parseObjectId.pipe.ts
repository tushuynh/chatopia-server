import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ERROR_MESSAGE } from 'src/shared/constants';

export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(ERROR_MESSAGE.ID_INVALID);
    }

    return value;
  }
}
