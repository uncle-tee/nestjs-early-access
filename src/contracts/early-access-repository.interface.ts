export interface EarlyAccessRepository {
  create(email: string, name?: string): Promise<boolean>;

  delete(email: string): Promise<boolean>;


  find<T>(email: string): Promise<T> | Promise<null>;
}

export const EarlyAccessRepository = Symbol('EarlyAccessRepository');