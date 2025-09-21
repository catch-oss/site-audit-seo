import { getJsonName } from '../src/utils.js';

describe('utils.js (simple tests)', () => {
  describe('getJsonName', () => {
    it('should generate a json name with timestamp', () => {
      const mockTimestamp = 1640995200000; // 2022-01-01T00:00:00.000Z
      const jsonPath = '/path/to/test-site.json';
      const result = getJsonName(jsonPath, false, mockTimestamp);
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}\.\d{3}__test-site\.json$/);
    });

    it('should generate a short json name without milliseconds', () => {
      const mockTimestamp = 1640995200000;
      const jsonPath = '/path/to/test-site.json';
      const result = getJsonName(jsonPath, true, mockTimestamp);
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}__test-site\.json$/);
    });

    it('should sanitize filename from path', () => {
      const mockTimestamp = 1640995200000;
      const jsonPath = '/path/to/test@#$%site.json';
      const result = getJsonName(jsonPath, true, mockTimestamp);
      
      expect(result).toContain('testsite.json');
    });

    it('should use current timestamp when none provided', () => {
      const jsonPath = '/path/to/test.json';
      const result = getJsonName(jsonPath);
      
      expect(result).toContain('test.json');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}\.\d{3}__test\.json$/);
    });

    it('should handle paths with cyrillic characters', () => {
      const mockTimestamp = 1640995200000;
      const jsonPath = '/path/to/тест-сайт.json';
      const result = getJsonName(jsonPath, false, mockTimestamp);
      
      expect(result).toContain('тест-сайт.json');
    });
  });
});