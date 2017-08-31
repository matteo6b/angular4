import { StreetPage } from './app.po';

describe('street App', () => {
  let page: StreetPage;

  beforeEach(() => {
    page = new StreetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
