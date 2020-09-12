import {AbstractHttpAdapter} from '@nestjs/core';
import {EarlyAccessController} from '../controllers/early-access.controller';
import {ConfigImpl} from '../impl/config.impl';

export abstract class ViewLoader {

  public abstract register(httpAdapter: AbstractHttpAdapter,
                           constructor: EarlyAccessController,
                           options: ConfigImpl);
}