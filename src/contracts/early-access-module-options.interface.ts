import { EarlyAccessRepository } from './early-access-repository.interface';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { EarlyAccessViewTemplate } from './early-access-view-template.interface';

export interface EarlyAccessModuleOptions {
  /**
   * Is early access enabled? when early access is enabled, the early access will work for all routes
   */
  enabled: boolean;


  /**
   * This is the url to use to access the early access page this defaults to "/early-access"
   */
  url?: string;

  /**
   * This is the url to access your login page
   */
  loginUrl?: string;

  /**
   * Twitter handle without the @. This will be added to the share message included with the subscription message.
   */
  twitterHandle?: string;

  /**
   * This is the template you want render your view
   */
  template?: EarlyAccessViewTemplate;


  /**
   * The message that will show on twitter when share.
   */
  twitterShareMessage?: string;


  /**
   * This is the repository that will be called during save or update
   */
  repository?: EarlyAccessRepository;


}


export interface EarlyAccessOptionsFactory {
  createEarlyAccessOptions(): Promise<EarlyAccessModuleOptions> | EarlyAccessModuleOptions;
}


export interface EarlyAccessAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<EarlyAccessOptionsFactory>;
  useClass?: Type<EarlyAccessOptionsFactory>;
  useFactory?: (...args) => Promise<EarlyAccessModuleOptions> | EarlyAccessModuleOptions;
  inject?: any[];
}