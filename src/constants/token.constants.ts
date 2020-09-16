import { EarlyAccessDefaultTemplateInterface } from '../contracts/early-access-default-template.interface';

export const EARLY_ACCESS_OPTIONS = 'EARLY_ACCESS_OPTIONS';
export const EARLY_ACCESS_URL = '/early-access';
export const EARLY_ACCESS_ASSETS_DIR = `${__dirname}/../../assets`;
export const EARLY_ACCESS_VIEWS_DIR = `${__dirname}/../../views`;
export const EARLY_ACCESS_INDEX = 'index';

export const DEFAULT_TEMPLATE: EarlyAccessDefaultTemplateInterface = {

  logo: {
    type: 'text',
    source: 'Nest JS',
    color: '#5661b3',
  },
  placeHolderImage: `/svg/placeholder.svg`,
  productName: 'NEST JS',
  welcomeMessage: {
    color: '#5661b3',
    text: `Welcome to Nest Js`,
    sub: `'Welcome to ${this.propertyName}. You can customize this message in the env folder. You can start by reading the installation guide in the readme.'`,
  },
  submitButton: {
    text: 'GET EARLY ACCESS',
    color: '#5661b3',
  },
};



