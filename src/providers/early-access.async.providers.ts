import {EarlyAccessAsyncOptions, EarlyAccessOptionsFactory} from '..';
import {EARLY_ACCESS_OPTIONS} from '../constants/token.constants';

export function createEarlyAccessAsyncProviders(options: EarlyAccessAsyncOptions) {
    if (options.useExisting || options.useFactory) {
        return [createEarlyAccessAsyncOptionsProviders(options)];
    }
    return [
        createEarlyAccessAsyncOptionsProviders(options),
        {
            provide: options.useClass,
            useClass: options.useClass,
        },
    ];
}

function createEarlyAccessAsyncOptionsProviders(options: EarlyAccessAsyncOptions) {
    if (options.useFactory) {

        return {
            provide: EARLY_ACCESS_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }

    return {
        provide: EARLY_ACCESS_OPTIONS,
        useFactory: async (optionsFactory: EarlyAccessOptionsFactory) => optionsFactory.createEarlyAccessOptions(),
        inject: [options.useExisting || options.useClass],

    };

}



