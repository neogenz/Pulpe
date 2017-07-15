// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  subdomain: '',
  domain: '172.20.10.14',//'172.20.10.2',
  port: '5000',
  protocol: 'http',
  baseUrl() {
    return `${this.protocol}://${(this.subdomain ? (this.subdomain + '.') : '')}${this.domain}:${this.port}`
  }
};
