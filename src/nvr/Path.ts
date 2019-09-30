/**
 * Known valid paths on the NVR's API
 */
enum Path {
  /**
   * Retrieves NVR configuration data, uses a complex XML request/response
   */
  'gw',

  /**
   * Retrieves current snapshot for a camera
   */
  'snapshot',

  /**
   * Retrieves mjpeg stream for a camera
   */
  'sp',
}

export default Path;
