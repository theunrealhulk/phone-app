/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/money`; params?: Router.UnknownInputParams; } | { pathname: `/test`; params?: Router.UnknownInputParams; } | { pathname: `/write-level`; params?: Router.UnknownInputParams; } | { pathname: `/write`; params?: Router.UnknownInputParams; } | { pathname: `/read-level`; params?: Router.UnknownInputParams; } | { pathname: `/read`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/money`; params?: Router.UnknownOutputParams; } | { pathname: `/test`; params?: Router.UnknownOutputParams; } | { pathname: `/write-level`; params?: Router.UnknownOutputParams; } | { pathname: `/write`; params?: Router.UnknownOutputParams; } | { pathname: `/read-level`; params?: Router.UnknownOutputParams; } | { pathname: `/read`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/money${`?${string}` | `#${string}` | ''}` | `/test${`?${string}` | `#${string}` | ''}` | `/write-level${`?${string}` | `#${string}` | ''}` | `/write${`?${string}` | `#${string}` | ''}` | `/read-level${`?${string}` | `#${string}` | ''}` | `/read${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/money`; params?: Router.UnknownInputParams; } | { pathname: `/test`; params?: Router.UnknownInputParams; } | { pathname: `/write-level`; params?: Router.UnknownInputParams; } | { pathname: `/write`; params?: Router.UnknownInputParams; } | { pathname: `/read-level`; params?: Router.UnknownInputParams; } | { pathname: `/read`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
