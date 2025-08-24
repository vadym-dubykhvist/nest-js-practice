import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class StringToLowercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return value;
  }
}
