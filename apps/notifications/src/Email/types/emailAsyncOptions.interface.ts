import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export type EmailAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject' | 'useFactory'>;
