describe('program.js', () => {
  it('should load program module', async () => {
    const programModule = await import('../src/program.js');
    expect(programModule).toBeDefined();
    expect(programModule.default).toBeDefined();
  });

  it('should have program structure', async () => {
    const programModule = await import('../src/program.js');
    const program = programModule.default;
    
    expect(program).toBeDefined();
    expect(typeof program).toBe('object');
  });

  it('should have program methods', async () => {
    const programModule = await import('../src/program.js');
    const program = programModule.default;
    
    // Test that it has basic commander.js methods
    expect(typeof program.parse).toBe('function');
    expect(typeof program.name).toBe('function');
    expect(typeof program.version).toBe('function');
  });

  it('should have package information', async () => {
    const programModule = await import('../src/program.js');
    const program = programModule.default;
    
    // Should have version from package.json
    expect(program.version()).toBeDefined();
    expect(typeof program.version()).toBe('string');
  });
});