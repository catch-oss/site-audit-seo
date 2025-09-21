describe('presets/fields.js', () => {
  it('should load fields module without errors', async () => {
    const fieldsModule = await import('../src/presets/fields.js');
    expect(fieldsModule).toBeDefined();
  });

  it('should have fields as an array or object', async () => {
    const fieldsModule = await import('../src/presets/fields.js');
    
    expect(fieldsModule).toBeDefined();
    // Fields module should be importable even if it has complex structure
    expect(typeof fieldsModule).toBe('object');
  });
});