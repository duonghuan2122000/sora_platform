export {};

declare global {
  interface WindowAppConfig {
    basePath: string;
  }

  interface Window {
    _appConfig?: WindowAppConfig;
  }
}
