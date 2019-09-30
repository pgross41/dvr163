import request from 'request-promise-native';
import { GwDevinfoAttrs, GwEnvloadScreenAttrs } from './Gw';
import nvrClient from './nvrClient';
import Path from './Path';

/**
 * Business logic for consuming the convoluted nvrClient
 */
class NvrService {
  /**
   * Return a handle to the mjpeg stream
   */
  public getMjpegStream(channelNumber: number) {
    const mjpegUrl = nvrClient.getCgiUrl(Path.sp, { chn: channelNumber, q: 0 });
    return request(mjpegUrl);
  }

  /**
   * Return a handle to a snapshot image
   */
  public getSnapshot(channelNumber: number): any {
    const snapshotUrl = nvrClient.getCgiUrl(Path.snapshot, { chn: channelNumber, q: 0 });
    return request(snapshotUrl);
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
