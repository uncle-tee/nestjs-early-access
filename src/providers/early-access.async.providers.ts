import {IllegalArgumentException} from '../exception/illegal-argument.exception';
import {EarlyAccessAsyncOptions, EarlyAccessOptionsFactory} from '..';
import {EARLY_ACCESS_OPTIONS} from '../constants/token.constants';
import * as fs from 'fs';

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
        useFactory: async (optionsFactory: EarlyAccessOptionsFactory) => {
            let earlyAccessOptions = await optionsFactory.createEarlyAccessOptions();
            if (earlyAccessOptions.template?.index && !earlyAccessOptions.template?.viewDir) {
                throw new IllegalArgumentException('The view directory of the index file must be provided');
            }
            if (earlyAccessOptions.template?.viewDir && !fs.existsSync(earlyAccessOptions.template?.viewDir)) {
                throw new IllegalArgumentException('Views dir provided does not exist');
            }
            if (earlyAccessOptions.template?.assetsDir && !fs.existsSync(earlyAccessOptions.template?.assetsDir))
                throw new IllegalArgumentException('Assets dir provided does not exist');
        },
        inject: [options.useExisting || options.useClass],

    };

}



