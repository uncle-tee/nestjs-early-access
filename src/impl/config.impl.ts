import {Inject, Injectable} from '@nestjs/common';
import {EarlyAccessModuleOptions} from "..";
import {EARLY_ACCESS_OPTIONS} from "../constants/token.constants";

@Injectable()
export class ConfigImpl {

    constructor(@Inject(EARLY_ACCESS_OPTIONS) private readonly earlyAccessModuleOptions: EarlyAccessModuleOptions) {
    }

    public getTwitterHandle() {
        return this.earlyAccessModuleOptions.twitterHandle;
    }

    public twitterShareMessage() {
        return this.earlyAccessModuleOptions.twitterShareMessage;
    }

    public viewTemplate() {
        return this.earlyAccessModuleOptions.template;
    }

}