/**
 * XML object for gw request/reply
 */

export interface Gw {
  juan: {
    devinfo: {
      _attributes: GwDevinfoAttrs;
    };
    envload: {
      screen: {
        _attributes: GwEnvloadScreenAttrs;
      };
    };
  };
}

export interface GwDevinfoAttrs {
  errno?: string;
  name?: string;
  model?: string;
  serialnumber?: string;
  hwver?: string;
  swver?: string;
  reldatetime?: string;
  ip?: string;
  httpport?: string;
  clientport?: string;
  rip?: string;
  rhttpport?: string;
  rclientport?: string;
  camcnt?: string;
  sensorcnt?: string;
}

export interface GwEnvloadScreenAttrs {
  chn: string;
  title?: string;
}
