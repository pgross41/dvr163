/**
 * Known valid URL parameters for the NVR's API
 */
export type UrlParams = Params | GwParams;

/**
 * Parameters for most of the endpoints
 */
export interface Params {
  [key: string]: string | number;

  /**
   * NVR username
   */
  u?: string;

  /**
   * NVR password
   */
  p?: string;

  /**
   * Random number, supposedly for cache busting
   */
  rand?: number;

  /**
   * Channel number for a camera (starts at 0)
   */
  chn?: number;

  /**
   * Integer possibly used to set quality but appears to do nothing
   */
  q?: number;
}

/**
 * Parameters for the gw endpoint
 */
export interface GwParams {
  /**
   * XML body for gw endpoint requests
   */
  xml?: string;

  /**
   * Appears to be the current date for gw endpoint, purpose is unknown, possibly cache busting
   */
  _?: number;
}
