import {DynamicModule, Global, Module, OnModuleInit} from '@nestjs/common';

import {EarlyAccessController} from './controllers/early-access.controller';
import {ConfigImpl} from './impl/config.impl';
import {createEarlyAccessAsyncProviders} from './providers/early-access.async.providers';
import {IllegalArgumentException} from './exception/illegal-argument.exception';
import {EarlyAccessAsyncOptions, EarlyAccessModuleOptions} from './contracts/early-access-module-options.interface';
import {
  createEarlyAccessProviders,
  EarlyAccessRepositoryProvider,
  EarlyAccessServiceProvider,
  EarlyAccessViewLoaderProvider,
} from './providers/early-access.providers';
import {ViewLoader} from './abstracts/view.loader';
import {HttpAdapterHost} from '@nestjs/core';


@Global()
@Module({
  providers: [EarlyAccessViewLoaderProvider],
})
export class EarlyAccessModule implements OnModuleInit {

  constructor(private readonly options: ConfigImpl,
              private readonly controller: EarlyAccessController,
              private readonly viewLoader: ViewLoader,
              private readonly httpAdapterHost: HttpAdapterHost) {
  }

  static forRoot(options: EarlyAccessModuleOptions): DynamicModule {
    if (options.template.index && !options.template.viewDir) {
      throw new IllegalArgumentException('The view directory of the index file must be provided');
    }
    const providers = [...createEarlyAccessProviders(options),
      ConfigImpl,
      EarlyAccessRepositoryProvider,
      EarlyAccessServiceProvider,
      EarlyAccessViewLoaderProvider,
      EarlyAccessController,
    ];
    return {
      module: EarlyAccessModule,
      providers: providers,
    };
  }


  static registerAsync(asyncOptions: EarlyAccessAsyncOptions): DynamicModule {
    const providers = [...createEarlyAccessAsyncProviders(asyncOptions),
      ConfigImpl,
      EarlyAccessRepositoryProvider,
      EarlyAccessServiceProvider,
      EarlyAccessViewLoaderProvider,
      EarlyAccessController];

    return {
      module: EarlyAccessModule,
      providers,
      imports: asyncOptions.imports,
    };
  }

  onModuleInit(): any {
    this.viewLoader.register(this.httpAdapterHost.httpAdapter, this.controller, this.options);
  }

}
