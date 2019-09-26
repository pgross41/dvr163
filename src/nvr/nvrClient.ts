import request from 'request-promise-native';
import xmlJs from 'xml-js';
import config from '../config';
import { Gw, GwDevinfoAttrs, GwEnvloadScreenAttrs } from './Gw';
import Path from './Path';
import { GwParams, Params, UrlParams } from './UrlParams';

/**
 * Communicate with the DVR163 NVR
 */
class NvrClient {
  /**
   * Build the URL for all requests
   */
  public getCgiUrl(path: Path, params: UrlParams = {}) {
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

  /**
   * Use gw for devinfo
   */
  public async getDevinfo() {
    const attrs: GwDevinfoAttrs = { camcnt: '', httpport: '', sensorcnt: '' };
    const xmlObj = {
      devinfo: {
        _attributes: attrs,
      },
    };
    const gw = await this.getGw(xmlObj);
    return gw.devinfo._attributes;
  }

  /**
   * Use gw for envload screen
   */
  public async getEnvloadScreen(channelNumber: number) {
    const attrs = { chn: channelNumber, title: '' };
    const gw = await this.getGw(this.makeEnvloadXmlObj('screen', attrs));
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
    const gwParams: GwParams = {
      _: Date.now(),
      xml: encodeURI(xml.toString()),
    };
    const url = this.getCgiUrl(Path.gw, gwParams);
    const xmlResponse = await request(url);

    // Parse XML response
    const response: Gw = xmlJs.xml2js(xmlResponse, { compact: true }) as Gw;
    return response.juan;
  }
}

export default new NvrClient();
