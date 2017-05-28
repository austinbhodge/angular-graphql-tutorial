import { NgGraphqlPage } from './app.po';

describe('ng-graphql App', () => {
  let page: NgGraphqlPage;

  beforeEach(() => {
    page = new NgGraphqlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
