describe('E2E testing for Name', function(){
  it('can enter text', function(){
    browser.get('/#/name');
    var testText = 'testing text from protractor';
    element(by.model('mc.name')).sendKeys(testText).then(function(){
      return element(by.binding('mc.name')).getText();
    }).then(function(value){
      expect(value).toBe('Smith'+testText);
    });
  })

  it('links to details', function(){
    element(by.css('.click-me')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toBe('/name/details');
    });
  })

});
