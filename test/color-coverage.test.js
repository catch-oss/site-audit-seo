import color from '../src/color.js';

describe('color.js module', () => {
  it('should import color module successfully', () => {
    expect(color).toBeDefined();
    expect(typeof color).toBe('object');
    expect(color).not.toBeNull();
  });

  it('should access all color properties to trigger coverage', () => {
    // Access each specific property to trigger line coverage
    expect(color.reset).toBe('\x1b[0m');
    expect(color.white).toBe('\x1b[37m'); 
    expect(color.yellow).toBe('\x1b[33m');
    expect(color.red).toBe('\x1b[31m');
  });

  it('should verify color object structure', () => {
    const colorKeys = Object.keys(color);
    expect(colorKeys).toContain('reset');
    expect(colorKeys).toContain('white');
    expect(colorKeys).toContain('yellow');
    expect(colorKeys).toContain('red');
    expect(colorKeys.length).toBe(4);
  });

  it('should access color values', () => {
    // Additional access to ensure coverage
    Object.entries(color).forEach(([key, value]) => {
      expect(typeof key).toBe('string');
      expect(typeof value).toBe('string');
      expect(value.startsWith('\x1b')).toBe(true);
    });
  });
});