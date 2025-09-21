import { startViewer } from '../src/actions/index.js';

describe('actions/startViewer (simple)', () => {
  it('should be a function', () => {
    expect(typeof startViewer).toBe('function');
  });

  it('should be exported from actions/index.js', () => {
    expect(startViewer).toBeDefined();
  });
});