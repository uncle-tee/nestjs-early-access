import {Inject, Injectable} from '@nestjs/common';
import {EarlyAccessModuleOptions, EarlyAccessViewTemplate} from "..";
import {EARLY_ACCESS_OPTIONS} from "../constants/token.constants";

@Injectable()
export class ConfigImpl {

    constructor(@Inject(EARLY_ACCESS_OPTIONS) private readonly earlyAccessModuleOptions: EarlyAccessModuleOptions) {
    }

    public getTwitterHandle(): string | undefined {
        return this.earlyAccessModuleOptions.twitterHandle;
    }

    public twitterShareMessage(): string | undefined {
        return this.earlyAccessModuleOptions.twitterShareMessage;
    }

    public viewTemplate(): EarlyAccessViewTemplate | undefined {
        return this.earlyAccessModuleOptions.template;
    }

}