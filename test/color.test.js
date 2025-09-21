import color from '../src/color.js';

describe('color.js', () => {
  it('should define color constants', () => {
    expect(color).toBeDefined();
    expect(typeof color).toBe('object');
    
    // Access all properties to trigger coverage
    const { reset, white, yellow, red } = color;
    const allColors = [reset, white, yellow, red];
    expect(allColors).toHaveLength(4);
    
    // Use the colors to ensure they're covered
    const testString = `${red}Error${reset} ${yellow}Warning${reset} ${white}Info${reset}`;
    expect(testString).toContain('\x1b[31m');
  });

  it('should have ANSI color codes', () => {
    expect(color.reset).toBe('\x1b[0m');
    expect(color.white).toBe('\x1b[37m');
    expect(color.yellow).toBe('\x1b[33m');
    expect(color.red).toBe('\x1b[31m');
  });

  it('should contain all expected color properties', () => {
    const expectedProperties = ['reset', 'white', 'yellow', 'red'];
    expectedProperties.forEach(prop => {
      expect(color).toHaveProperty(prop);
      expect(typeof color[prop]).toBe('string');
    });
  });

  it('should have all colors as string values', () => {
    Object.values(color).forEach(value => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('should use the color object properties directly', () => {
    const { reset, white, yellow, red } = color;
    expect(reset).toBe('\x1b[0m');
    expect(white).toBe('\x1b[37m');
    expect(yellow).toBe('\x1b[33m');
    expect(red).toBe('\x1b[31m');
  });

  it('should have exactly 4 color properties', () => {
    const keys = Object.keys(color);
    expect(keys).toHaveLength(4);
    expect(keys.sort()).toEqual(['red', 'reset', 'white', 'yellow']);
  });

  it('should be usable for terminal colorization', () => {
    const colorizedText = `${color.red}Error${color.reset}`;
    expect(colorizedText).toBe('\x1b[31mError\x1b[0m');
    
    const warningText = `${color.yellow}Warning${color.reset}`;
    expect(warningText).toBe('\x1b[33mWarning\x1b[0m');
  });

  it('should have consistent ANSI escape sequences', () => {
    // All values should start with \x1b[ and end with m
    Object.values(color).forEach(value => {
      expect(value).toMatch(/^\x1b\[\d+m$/);
    });
  });
});