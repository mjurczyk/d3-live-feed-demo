const expect = require('chai').expect;
const logger = require('../src/utils/logger');

describe('logger.js', () => {
  it('should define warning proxy', () => {
    expect(logger.warning).to.be.defined;
  });
});