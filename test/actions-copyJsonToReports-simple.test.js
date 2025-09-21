import { copyJsonToReports } from '../src/actions/index.js';

describe('actions/copyJsonToReports (simple)', () => {
  it('should be a function', () => {
    expect(typeof copyJsonToReports).toBe('function');
  });

  it('should be exported from actions/index.js', () => {
    expect(copyJsonToReports).toBeDefined();
  });
});