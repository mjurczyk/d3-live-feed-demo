const expect = require('chai').expect;
const onMobile = require('../src/utils/onMobile');

describe('onMobile', () => {
  it('should expose onMobile function', () => {
    expect(onMobile.onMobile).to.be.defined;
  });
});
