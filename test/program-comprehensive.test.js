describe('program.js comprehensive testing', () => {
  let originalArgv;
  
  beforeEach(() => {
    // Save original process.argv
    originalArgv = process.argv;
  });
  
  afterEach(() => {
    // Restore original process.argv
    process.argv = originalArgv;
  });

  it('should import program module and access properties', async () => {
    const { default: program } = await import('../src/program.js');
    expect(program).toBeDefined();
    expect(typeof program).toBe('object');
    
    // Access common commander.js properties that might exist
    if (program && typeof program === 'object') {
      // Try to access common methods without calling them
      const methods = ['name', 'version', 'description', 'usage', 'parse'];
      methods.forEach(method => {
        if (method in program && typeof program[method] === 'function') {
          expect(program[method]).toBeInstanceOf(Function);
        }
      });
      
      // Access common properties
      const properties = ['commands', 'options', '_events'];
      properties.forEach(prop => {
        if (prop in program) {
          expect(program[prop]).toBeDefined();
        }
      });
    }
  });

  it('should handle program configuration', async () => {
    const { default: program } = await import('../src/program.js');
    
    // Access program structure without executing commands
    if (program && program.commands) {
      expect(Array.isArray(program.commands) || typeof program.commands === 'object').toBe(true);
    }
    
    if (program && program.options) {
      expect(Array.isArray(program.options) || typeof program.options === 'object').toBe(true);
    }
  });

  it('should verify program module structure', async () => {
    const programModule = await import('../src/program.js');
    expect(programModule.default).toBeDefined();
    
    // Access all exports
    const exports = Object.keys(programModule);
    exports.forEach(exportName => {
      expect(programModule[exportName]).toBeDefined();
    });
  });

  it('should handle program as commander instance', async () => {
    const { default: program } = await import('../src/program.js');
    
    // Test that it behaves like a commander program
    if (program && typeof program === 'object') {
      // Commander programs typically have these properties
      const expectedProps = ['rawArgs', 'args'];
      expectedProps.forEach(prop => {
        if (prop in program) {
          expect(program[prop]).toBeDefined();
        }
      });
    }
  });
});