import { GwDevinfoAttrs, GwEnvloadScreenAttrs } from './Gw';
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
   *  Use gw endpoint for devinfo and other useful info
   */
  public async getConfig() {
    const devinfo = await nvrClient.getDevinfo();
    const camCount = parseInt(devinfo.camcnt, 10);
    const screens = [];
    for (let i = 0; i < camCount; i++) {
      screens.push(await nvrClient.getEnvloadScreen(i));
    }
    return { ...devinfo, screens } as Config;
  }
}

interface Config extends GwDevinfoAttrs {
  screens: GwEnvloadScreenAttrs[];
}

export default new NvrService();
