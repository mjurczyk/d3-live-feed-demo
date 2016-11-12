const expect = require('chai').expect;
const renderTemplate = require('../src/utils/renderTemplate');

describe('renderTemplate', () => {
  it('should define renderTemplate function', () => {
    expect(renderTemplate.renderTemplate).to.be.defined;
  });
  
  const fn = renderTemplate.renderTemplate;
  
  it('should return empty string for empty template, without values defined', () => {
    expect(fn('', undefined)).to.be.equal('');
  });
  
  it('should return empty string for empty template, with values defined', () => {
    expect(fn('', { key: 'value' })).to.be.equal('');
  });
  
  it('should return a properly parsed template', () => {
    const template = '<div>{sample} {value.from.object}</div>';
    const object = {
      sample: 'this',
      value: {
        from: {
          object: 'should be returned.' 
        }
      }
    };
    const result = '<div>this should be returned.</div>';
    
    expect(fn(template, object)).to.be.equal(result);
  });
});