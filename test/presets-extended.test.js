describe('presets modules (extended)', () => {
  it('should load columns.js', async () => {
    const module = await import('../src/presets/columns.js');
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });

  it('should load filters.js', async () => {
    const module = await import('../src/presets/filters.js');
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });

  it('should load scraperFields.js', async () => {
    const module = await import('../src/presets/scraperFields.js');
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });

  it('should verify columns structure', async () => {
    const module = await import('../src/presets/columns.js');
    const columns = module.default;
    
    expect(columns).toBeDefined();
    expect(typeof columns).toBe('object');
  });

  it('should verify filters structure', async () => {
    const module = await import('../src/presets/filters.js');
    const filters = module.default;
    
    expect(filters).toBeDefined();
    expect(typeof filters).toBe('object');
  });

  it('should verify scraperFields structure', async () => {
    const module = await import('../src/presets/scraperFields.js');
    const scraperFields = module.default;
    
    expect(scraperFields).toBeDefined();
    expect(typeof scraperFields).toBe('object');
  });

  it('should have consistent export patterns', async () => {
    const modules = [
      '../src/presets/columns.js',
      '../src/presets/filters.js', 
      '../src/presets/scraperFields.js',
      '../src/presets/fields-lighthouse.js',
      '../src/presets/fields-lighthouse-en.js'
    ];

    for (const modulePath of modules) {
      const module = await import(modulePath);
      expect(module).toBeDefined();
      expect(module.default).toBeDefined();
    }
  });
});