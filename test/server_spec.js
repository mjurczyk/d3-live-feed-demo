const expect = require('chai').expect;
const server = require('../src/server');

describe('server mock', () => {
  it('should expose initial state', () => {
    expect(server.initialState).to.be.defined;
  });
  
  it('should expose pull method', () => {
    expect(server.getServerState).to.be.a.function;
  });
});
