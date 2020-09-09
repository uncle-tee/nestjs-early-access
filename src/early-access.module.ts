import {DynamicModule, Global, Module} from '@nestjs/common';

import {EarlyAccessController} from './controllers/early-access.controller';
import {ConfigImpl} from './impl/config.impl';
import {createEarlyAccessAsyncProviders} from './providers/early-access.async.providers';
import {IllegalArgumentException} from './exception/illegal-argument.exception';
import {EarlyAccessAsyncOptions, EarlyAccessModuleOptions} from "./contracts/early-access-module-options.interface";
import {
    ControllerHackProvider,
    createEarlyAccessProviders,
    EarlyAccessRepositoryProvider,
    EarlyAccessServiceProvider
} from "./providers/early-access.providers";


@Global()
@Module({})
export class EarlyAccessModule {

    static forRoot(options: EarlyAccessModuleOptions): DynamicModule {
        if (options.template.index && !options.template.viewDir) {
            throw new IllegalArgumentException('The view directory of the index file must be provided');
        }
        const providers = [...createEarlyAccessProviders(options),
            ConfigImpl,
            EarlyAccessRepositoryProvider,
            EarlyAccessServiceProvider,
            ControllerHackProvider];
        return {
            module: EarlyAccessModule,
            controllers: [EarlyAccessController],
            providers: providers,
        };
    }


    static registerAsync(asyncOptions: EarlyAccessAsyncOptions): DynamicModule {
        const providers = [...createEarlyAccessAsyncProviders(asyncOptions),
            ConfigImpl,
            EarlyAccessRepositoryProvider,
            EarlyAccessServiceProvider,
            ControllerHackProvider];

        return {
            module: EarlyAccessModule,
            controllers: [EarlyAccessController],
            providers,
            imports: asyncOptions.imports,
        };
    }

}
