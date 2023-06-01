import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export type SMSAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject' | 'useFactory'>;
