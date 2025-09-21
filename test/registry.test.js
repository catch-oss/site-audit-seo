describe('registry.js', () => {
  it('should load registry module without errors', async () => {
    const registryModule = await import('../src/registry.js');
    expect(registryModule).toBeDefined();
    expect(registryModule.default).toBeDefined();
  });

  it('should have registry structure', async () => {
    const registryModule = await import('../src/registry.js');
    const registry = registryModule.default;
    
    expect(registry).toBeDefined();
    expect(typeof registry).toBe('object');
  });

  it('should have expected methods', async () => {
    const registryModule = await import('../src/registry.js');
    const registry = registryModule.default;
    
    expect(registry).toHaveProperty('execPlugins');
    expect(registry).toHaveProperty('getPlugins');
    expect(registry).toHaveProperty('load');
    expect(typeof registry.execPlugins).toBe('function');
    expect(typeof registry.getPlugins).toBe('function');
    expect(typeof registry.load).toBe('function');
  });
});