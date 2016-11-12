const expect = require('chai').expect;
const getDeepValueByString = require('../src/utils/getDeepValueByString');

describe('getDeepValueByString', () => {
  it('should define getDeepValueByString function', () => {
    expect(getDeepValueByString.getDeepValueByString).to.be.defined;
  });
  
  const fn = getDeepValueByString.getDeepValueByString;
  
  it('should return null for no arguments', () => {
    expect(fn()).to.be.null;
  });
  
  it('should return null for no specified object', () => {
    expect(fn(undefined, 'some.key')).to.be.null;
  });
  
  it('should return null for no specified key chain', () => {
    expect(fn({ key: 'value' }, undefined)).to.be.null;
  });
  
  it('should return a shallow value', () => {
    expect(fn({
      key: 'value'
    }, 'key')).to.be.equal('value');
  });
  
  it('should return a deep value', () => {
    expect(fn({
      subobject: {
        key: 'value'
      }
    }, 'subobject.key')).to.be.equal('value');
  });
});