import request from 'request-promise-native';
import xmlJs from 'xml-js';
import config from './../config';

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
  'sp'
}

/**
 * Known valid parameters for the NVR's API
 * Not all params are valid for all paths
 */
interface Params {
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
   * Integer possibly used to set quality but purose is unknown
   */
  q?: number;

  /**
   * XML request for gw endpoint
   */
  xml?: string;

  /**
   * Appears to be the current date for gw endpoint, purpose is unknown
   */
  _?: number;
}

/**
 * Communicate with the DVR163 NVR
 */
class NvrService {
  /**
   * Return a handle to the mjpeg stream
   */
  public getMjpegStream(channelNumber: number) {
    const mjpegUrl = this.getCgiUrl(Path.sp, {
      chn: channelNumber,
      q: 0
    });
    return request(mjpegUrl);
  }

  public async getDevinfo() {
    const gw = await this.getGw('devinfo', ['camcnt', 'sensorcnt', 'httpport']);
    return gw;
  }

  /**
   * Send a request to the gw endpoint which uses an XML request and response
   */
  private async getGw(name: string, attrs: string[]) {
    // Build XML request
    const attrObj: { [key: string]: string } = {};
    attrs.forEach(key => (attrObj[key] = ''));
    const xmlObj = {
      juan: {
        _attributes: {
          dir: 0,
          enc: 1,
          squ: 'abcdef',
          ver: 0
        },
        [name]: {
          _attributes: attrObj
        }
      }
    };
    const xml = xmlJs.js2xml(xmlObj, { compact: true });

    // Send GET request with XML encoded in URL
    const url = this.getCgiUrl(Path.gw, {
      _: Date.now(),
      xml: encodeURI(xml.toString())
    });
    const xmlResponse = await request(url);

    // Parse XML response
    const response: any = xmlJs.xml2js(xmlResponse, { compact: true });
    return response.juan._attributes;
  }

  private getCgiUrl(path: Path, params: Params = {}) {
    const allParams = {
      ...params,
      p: config.nvrPassword,
      rand: Math.round(Math.random() * 10000),
      u: config.nvrUsername
    } as Params;
    const paramString = Object.keys(allParams)
      .map(key => `${key}=${allParams[key]}`)
      .join('&');
    return `${config.nvrHost}/cgi-bin/${Path[path]}.cgi?${paramString}`;
  }
}

export default new NvrService();
