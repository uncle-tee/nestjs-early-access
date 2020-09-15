export interface EarlyAccessDefaultTemplateInterface {

  /**
   * This is the name of the product you are trying to get early access too
   */
  productName: string;
  /**
   * This is the logo path it can be a url path or assets path
   */
  logo?: {
    type: 'img' | 'text',
    source: string;
    color?: string;
  };
  /**
   * This is the place holder image on the right corner
   */
  placeHolderImage?: string;

  /**
   * Welcome message on the page er Welcome Acme
   */

  welcomeMessage?: {
    color: string;
    text: string;
    sub?: string;
  }


  button?: {
    /**
     * This is the color of the submit button
     */
    text: string;
    /**
     * This is the text in the submit button
     */
    color: string;
  }

  /**
   * This is the login url
   */
  loginUrl?: string;


}