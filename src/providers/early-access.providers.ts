import {Provider} from '@nestjs/common';
import {EarlyAccessService} from '../contracts/early-access-service.interface';
import {EarlyAccessServiceImpl} from '../impl/early-access-service.impl';
import {EarlyAccessRepositoryImpl} from '../impl/early-access-repository.impl';
import {PATH_METADATA} from '@nestjs/common/constants';
import {EarlyAccessController} from '../controllers/early-access.controller';
import {HttpAdapterHost} from '@nestjs/core';
import {EarlyAccessModuleOptions, EarlyAccessRepository} from "..";
import {EARLY_ACCESS_OPTIONS} from "../constants/token.constants";


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

export const ControllerHackProvider = {
    provide: Symbol('CONTROLLER_HACK'),
    useFactory: (options: EarlyAccessModuleOptions, adapterHost: HttpAdapterHost) => {
        const controllerPrefix = options.url || 'early-access';
        adapterHost.httpAdapter.useStaticAssets(`${__dirname}/../../../../../src/early-access/assets`);
        Reflect.defineMetadata(
            PATH_METADATA,
            controllerPrefix,
            EarlyAccessController,
        );
    },
    inject: [EARLY_ACCESS_OPTIONS, HttpAdapterHost],

};





