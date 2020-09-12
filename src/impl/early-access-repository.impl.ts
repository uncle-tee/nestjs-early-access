import { Injectable } from '@nestjs/common';
import { EarlyAccessRepository } from '..';

@Injectable()
export class EarlyAccessRepositoryImpl implements EarlyAccessRepository {
    private _storage: Map<string, any> = new Map<string, any>();

    create(email: string, name?: string): Promise<boolean> {
        this._storage.set(email, {
            email, name,
        });
        return Promise.resolve(true);
    }

    delete(email: string): Promise<boolean> {
        if (this._storage.has(email)) {
            this._storage.delete(email);
        }

        return Promise.resolve(true);

    }

    find<T>(email: string): Promise<T> | Promise<null> {
        if (!this._storage.has(email)) {
            return Promise.resolve(null);
        }
        return Promise.resolve(this._storage.get(email));
    }

}