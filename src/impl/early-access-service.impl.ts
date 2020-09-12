import { EarlyAccessService } from '../contracts/early-access-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EarlyAccessRepository } from '..';

@Injectable()
export class EarlyAccessServiceImpl implements EarlyAccessService {
    constructor(@Inject(EarlyAccessRepository) private readonly  earlyAccessRepository: EarlyAccessRepository) {
    }

    async subscribe(email: string, name?: string): Promise<boolean> {
        let subscriber = await this.earlyAccessRepository.find(email);
        if (!subscriber) {
            return this.earlyAccessRepository.create(email, name);
        }

        return true;

    }

    async unSubscribe(email: string) {
        let subscriber = await this.earlyAccessRepository.find(email);
        if (subscriber) {
            return this.earlyAccessRepository.delete(email);
        }
        return false;

    }

}