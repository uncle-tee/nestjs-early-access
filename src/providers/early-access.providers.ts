import { Provider } from '@nestjs/common';
import { EarlyAccessServiceImpl } from '../impl/early-access-service.impl';
import { EarlyAccessRepositoryImpl } from '../impl/early-access-repository.impl';
import { HttpAdapterHost } from '@nestjs/core';
import { EarlyAccessModuleOptions, EarlyAccessRepository } from '..';
import { EARLY_ACCESS_OPTIONS } from '../constants/token.constants';
import { ViewLoader } from '../abstracts/view.loader';
import { ExpressLoaders } from '../loaders/express.loaders';
import { EarlyAccessService } from '../contracts/early-access-service.interface';


export function createEarlyAccessProviders(options: EarlyAccessModuleOptions): Provider[] {
  return [
    {
      provide: EARLY_ACCESS_OPTIONS,
      useValue: options,
    },
  ];
}


export const EarlyAccessServiceProvider = {
  provide: EarlyAccessService,
  useFactory: (repository: EarlyAccessRepository) => {
    return new EarlyAccessServiceImpl(repository);
  },
  inject: [EarlyAccessRepository],

};

export const EarlyAccessRepositoryProvider = {
  provide: EarlyAccessRepository,
  useFactory: (options: EarlyAccessModuleOptions) => {
    return options.repository ? options.repository : new EarlyAccessRepositoryImpl();
  },
  inject: [EARLY_ACCESS_OPTIONS],
};


export const EarlyAccessViewLoaderProvider = {
  provide: ViewLoader,
  useFactory: (httpAdapterHost: HttpAdapterHost) => {
    if (httpAdapterHost && httpAdapterHost.httpAdapter) {
      return new ExpressLoaders();
    }
  },
  inject: [HttpAdapterHost],
};





