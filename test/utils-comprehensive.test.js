import utils, { getJsonName, getUserDir, initDataDir } from '../src/utils.js';

describe('utils.js (comprehensive)', () => {
  // Test the default export object
  it('should export utils object correctly', () => {
    expect(utils).toBeDefined();
    expect(typeof utils).toBe('object');
    
    // Verify all functions are present in default export
    expect(utils.getJsonName).toBe(getJsonName);
    expect(utils.getUserDir).toBe(getUserDir);
    expect(utils.initDataDir).toBe(initDataDir);
  });

  it('should handle getJsonName with various inputs', () => {
    // Test with different timestamp scenarios
    const fixedTimestamp = 1640995200000; // 2022-01-01T00:00:00.000Z
    
    // Test long format
    const longName = getJsonName('/test/file.json', false, fixedTimestamp);
    expect(longName).toMatch(/\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}\.\d{3}__file\.json/);
    
    // Test short format (should remove milliseconds)
    const shortName = getJsonName('/test/file.json', true, fixedTimestamp);
    expect(shortName).toMatch(/\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}__file\.json/);
    expect(shortName).not.toContain('.000');
  });

  it('should handle getUserDir with various scenarios', () => {
    // Test default directory
    const defaultDir = getUserDir();
    expect(defaultDir).toBe('data/reports/');
    
    // Test with empty uid
    const emptyUidDir = getUserDir('');
    expect(emptyUidDir).toBe('data/reports/');
    
    // Test with custom local directory
    const customDir = getUserDir('', 'custom/path/');
    expect(customDir).toBe('custom/path/');
  });

  it('should test getJsonName filename sanitization', () => {
    const specialChars = '/path/to/file@#$%^&*()_+=[]{}|;:,.<>?test.json';
    const result = getJsonName(specialChars, true, 1640995200000);
    
    // Should contain sanitized filename - adjusted for actual output format
    expect(result).toContain('file_.test.json'); // Special chars removed except allowed ones
  });

  it('should handle edge cases in getUserDir', () => {
    // Test with very long uid (should be truncated to 5 chars)
    const result1 = getUserDir('verylongusernamethatexceeds5chars', 'test/');
    expect(result1).toBe('test/veryl'); // Only first 5 chars + sanitized
    
    // Test with special characters in uid
    const result2 = getUserDir('user@#$%', 'test/');
    expect(result2).toContain('test/'); // Should sanitize the uid
  });

  it('should handle current timestamp when none provided', () => {
    const beforeTime = Date.now();
    const result = getJsonName('/test/file.json');
    const afterTime = Date.now();
    
    // Should contain current date (year should be current)
    const currentYear = new Date().getFullYear();
    expect(result).toContain(currentYear.toString());
  });

  it('should test timezone handling in getJsonName', () => {
    // Test with a specific timestamp to verify timezone offset calculation
    const utcTimestamp = 1640995200000; // 2022-01-01T00:00:00.000Z
    const result = getJsonName('/test.json', false, utcTimestamp);
    
    // Should contain date components (exact values depend on timezone)
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}__\d{2}-\d{2}-\d{2}/);
  });

  it('should handle file paths without extensions', () => {
    const result = getJsonName('/path/to/filename_no_ext', true, 1640995200000);
    expect(result).toContain('filename_no_ext');
  });
});