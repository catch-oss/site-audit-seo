describe('presets modules', () => {
  it('should load fields-lighthouse.js', async () => {
    const module = await import('../src/presets/fields-lighthouse.js');
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });

  it('should load fields-lighthouse-en.js', async () => {
    const module = await import('../src/presets/fields-lighthouse-en.js');
    expect(module).toBeDefined(); 
    expect(module.default).toBeDefined();
  });

  it('should verify lighthouse fields structure', async () => {
    const module = await import('../src/presets/fields-lighthouse.js');
    const fields = module.default;
    
    expect(fields).toBeDefined();
    expect(typeof fields).toBe('object');
  });

  it('should verify lighthouse english fields structure', async () => {
    const module = await import('../src/presets/fields-lighthouse-en.js');
    const fields = module.default;
    
    expect(fields).toBeDefined();
    expect(typeof fields).toBe('object');
  });
});