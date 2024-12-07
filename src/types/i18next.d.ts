import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        nav: {
          home: string;
          packages: string;
          guide: string;
          about: string;
          contact: string;
          booking: string;
        };
      };
    };
  }
}
