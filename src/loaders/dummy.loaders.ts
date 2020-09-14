import {ViewLoader} from "../abstracts/view.loader";
import {AbstractHttpAdapter} from "@nestjs/core";
import {EarlyAccessController} from "../controllers/early-access.controller";
import {ConfigImpl} from "../impl/config.impl";

export class DummyLoaders extends ViewLoader {
    register(httpAdapter: AbstractHttpAdapter, controller: EarlyAccessController, config: ConfigImpl) {
    }

}