import nvrClient from './nvrClient';

/**
 * Helper methods for using the convoluted nvrClient
 */
class NvrService {
  /**
   * Return a handle to the mjpeg stream
   */
  public getMjpegStream(channelNumber: number) {
    return nvrClient.getMjpegStream(channelNumber);
  }

  /**
   *  Use gw endpoint for devinfo
   */
  public async getDevinfo() {
    return await nvrClient.getDevinfo();
  }

  /**
   *  Use gw endpoint for envload/screen
   */
  public async getScreen(channelNumber: number) {
    return await nvrClient.getEnvloadScreen(channelNumber);
  }
}

export default new NvrService();
