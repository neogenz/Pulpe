import { FrontPulpePage } from './app.po';

describe('front-pulpe App', () => {
  let page: FrontPulpePage;

  beforeEach(() => {
    page = new FrontPulpePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
