export class GlobalConstants {
  //public static URL: string = 'http://192.168.1.200:81/reception/api/';
  public static URLNuevo: string = window.location.host.includes('192.168.1')
    ? 'http://192.168.1.201:81/reception/api/'
    : 'http://26.187.160.72:81/reception/api/';
  public static URL: string = window.location.host.includes('192.168.1')
    ? 'http://192.168.1.200:81/reception/api/'
    : 'http://26.110.177.38:81/reception/api/';
}
