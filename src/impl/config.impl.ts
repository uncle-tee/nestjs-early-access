import {Inject, Injectable} from '@nestjs/common';
import {EarlyAccessModuleOptions} from '..';
import {
    DEFAULT_TEMPLATE,
    EARLY_ACCESS_ASSETS_DIR,
    EARLY_ACCESS_INDEX,
    EARLY_ACCESS_OPTIONS,
    EARLY_ACCESS_URL,
    EARLY_ACCESS_VIEWS_DIR,
} from '../constants/token.constants';

@Injectable()
export class ConfigImpl {

    constructor(@Inject(EARLY_ACCESS_OPTIONS) private readonly earlyAccessModuleOptions: EarlyAccessModuleOptions) {
    }

    public get twitterHandle(): string | undefined {
        return this.earlyAccessModuleOptions.twitterHandle;
    }

    public get twitterShareMessage(): string | undefined {
        return this.earlyAccessModuleOptions.twitterShareMessage;
    }


    public get baseUrl() {
        return this.earlyAccessModuleOptions.url || EARLY_ACCESS_URL;
    }

    public get assetsDir() {
        return this.earlyAccessModuleOptions.template?.assetsDir
            || this.earlyAccessModuleOptions.defaultTemplate?.assetsDir
            || EARLY_ACCESS_ASSETS_DIR;
    }

    public get viewsDir() {
        return this.earlyAccessModuleOptions.template?.viewDir
            || EARLY_ACCESS_VIEWS_DIR;
    }

    public get index() {
        return this.earlyAccessModuleOptions.template?.index || EARLY_ACCESS_INDEX;
    }

    public get defaultTemplate() {
        return this.earlyAccessModuleOptions.defaultTemplate || DEFAULT_TEMPLATE;
    }

}