export {};

declare global {
  interface WindowAppConfig {
    basePath: string;
    prefixLocalStorage: string;
  }

  interface WindowAPIs {
    baseUrl: string;
  }

  interface Window {
    _appConfig?: WindowAppConfig;

    _apis: WindowAPIs;
  }
}
