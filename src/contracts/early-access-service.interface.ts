export interface EarlyAccessService {
  subscribe(email: string, name?: string) : Promise<boolean>

  unSubscribe(email: string): Promise<boolean>;
}


export const EarlyAccessService = Symbol('EarlyAccessService');