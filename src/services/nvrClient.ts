import request from 'request-promise-native';
import xmlJs from 'xml-js';
import config from './../config';

/**
 * Attribute reference for gw XML requests
 */

const gwDevinfoAttrs = [
  'errno',
  'name',
  'model',
  'serialnumber',
  'hwver',
  'swver',
  'reldatetime',
  'ip',
  'httpport',
  'clientport',
  'rip',
  'rhttpport',
  'rclientport',
  'camcnt',
];

const gwEnvloadScreenAttrs = ['chn', 'title'];

interface gwStruct {
  devinfo: typeof gwDevinfoAttrs;
  envload: {
    screen: typeof gwEnvloadScreenAttrs;
  };
}

/**
 * Communicate with the DVR163 NVR
 */
class NvrClient {
  /**
   * Return a handle to the mjpeg stream
   */
  public getMjpegStream(channelNumber: number) {
    const mjpegUrl = this.getCgiUrl(Path.sp, {
      chn: channelNumber,
      q: 0,
    });
    return request(mjpegUrl);
  }

  /**
   * Use gw for devinfo
   */
  public async getDevinfo() {
    const xmlObj = {
      devinfo: {
        _attributes: this.blankAttrs(gwDevinfoAttrs),
      },
    };
    return (await this.getGw(xmlObj)).devinfo._attributes;
  }

  /**
   * Use gw for envload screen
   */
  public async getEnvloadScreen(channelNumber: number) {
    const attrs = this.blankAttrs(gwEnvloadScreenAttrs);
    const gw = await this.getGw(this.makeEnvloadXmlObj('screen', { ...attrs, chn: channelNumber }));
    return gw.envload.screen._attributes;
  }

  /**
   * Helper to generate xml obj for envload gw request
   */
  private makeEnvloadXmlObj(key: string, attrs: object) {
    return {
      envload: {
        _attributes: {
          pwd: config.nvrPassword,
          type: 0,
          usr: config.nvrUsername,
        },
        [key]: {
          _attributes: attrs,
        },
      },
    };
  }

  /**
   * Convert a list of attribute names into an object with blank values
   */
  private blankAttrs(attrs: string[]) {
    const attrObj: { [key: string]: string } = {};
    attrs.forEach((key) => (attrObj[key] = ''));
    return attrObj;
  }

  /**
   * Use the gw endpoint for config information include XML building/parsing
   */
  private async getGw(xmlObj: object) {
    // Build XML request
    const rootXmlObj = {
      juan: {
        _attributes: {
          dir: 0,
          enc: 1,
          squ: 'abcdef',
          ver: 0,
        },
        ...xmlObj,
      },
    };
    const xml = xmlJs.js2xml(rootXmlObj, { compact: true });

    // Send GET request with XML encoded in URL
    const url = this.getCgiUrl(Path.gw, {
      _: Date.now(),
      xml: encodeURI(xml.toString()),
    });
    const xmlResponse = await request(url);

    // Parse XML response
    const response: any = xmlJs.xml2js(xmlResponse, { compact: true });
    return response.juan;
  }

  /**
   * Build the URL for all requests
   */
  private getCgiUrl(path: Path, params: Params = {}) {
    const allParams = {
      ...params,
      p: config.nvrPassword,
      rand: Math.round(Math.random() * 10000),
      u: config.nvrUsername,
    } as Params;
    const paramString = Object.keys(allParams)
      .map((key) => `${key}=${allParams[key]}`)
      .join('&');
    return `${config.nvrHost}/cgi-bin/${Path[path]}.cgi?${paramString}`;
  }
}

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

/**
 * Known valid URL parameters for the NVR's API
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
   * Integer possibly used to set quality but appears to do nothing
   */
  q?: number;

  /**
   * XML body for gw endpoint requests
   */
  xml?: string;

  /**
   * Appears to be the current date for gw endpoint, purpose is unknown, possibly cache busting
   */
  _?: number;
}

export default new NvrClient();
