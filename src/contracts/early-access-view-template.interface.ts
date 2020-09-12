export interface EarlyAccessViewTemplate {
  /**
   * This is the path to the base view dir.
   */
  viewDir?: string,

  /**
   * This is the path to all the assets dir. Usually the path to HTML, css, JS
   */
  assetsDir?: string,

  /**
   * This is the index file that should be loaded. defaults to index
   */
  index?: string
}
