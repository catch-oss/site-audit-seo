import * as actions from '../src/actions/index.js';

describe('actions/index.js', () => {
  it('should export action functions', () => {
    expect(actions).toBeDefined();
    expect(typeof actions).toBe('object');
  });

  it('should export copyJsonToReports function', () => {
    expect(actions.copyJsonToReports).toBeDefined();
    expect(typeof actions.copyJsonToReports).toBe('function');
  });

  it('should export saveAsJson function', () => {
    expect(actions.saveAsJson).toBeDefined();
    expect(typeof actions.saveAsJson).toBe('function');
  });

  it('should export startViewer function', () => {
    expect(actions.startViewer).toBeDefined();
    expect(typeof actions.startViewer).toBe('function');
  });

  it('should export uploadJson function', () => {
    expect(actions.uploadJson).toBeDefined();
    expect(typeof actions.uploadJson).toBe('function');
  });

  it('should export all expected actions', () => {
    const expectedActions = ['copyJsonToReports', 'saveAsJson', 'startViewer', 'uploadJson'];
    expectedActions.forEach(action => {
      expect(actions).toHaveProperty(action);
      expect(typeof actions[action]).toBe('function');
    });
  });
});