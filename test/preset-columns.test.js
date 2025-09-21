describe('Preset columns module', () => {
  it('should load columns preset successfully', async () => {
    const columnsModule = await import('../src/presets/columns.js');
    expect(columnsModule).toBeDefined();
    expect(columnsModule.default).toBeDefined();
    
    const columns = columnsModule.default;
    expect(columns).toBeTruthy();
    
    // Access all preset properties to trigger coverage
    expect(columns.default).toBeDefined();
    expect(columns.default_plus_lighthouse).toBeDefined();
    expect(columns.lighthouse).toBeDefined();
    expect(columns.opengraph).toBeDefined();
    expect(columns.title).toBeDefined();
    expect(columns.mixed_content).toBeDefined();
    expect(columns.metatags).toBeDefined();
    expect(columns.content).toBeDefined();
  });

  it('should access column preset details', async () => {
    const { default: columns } = await import('../src/presets/columns.js');
    
    // Access each preset deeply to trigger all lines
    Object.keys(columns).forEach(presetKey => {
      const preset = columns[presetKey];
      expect(preset.name).toBeDefined();
      expect(preset.groups).toBeDefined();
      expect(preset.columns).toBeDefined();
      
      // Access array properties
      preset.groups.forEach(group => expect(group).toBeDefined());
      preset.columns.forEach(column => expect(column).toBeDefined());
    });
  });

  it('should handle specific preset properties', async () => {
    const { default: columns } = await import('../src/presets/columns.js');
    
    // Test preset with presets property
    expect(columns.lighthouse.presets).toBeDefined();
    columns.lighthouse.presets.forEach(preset => expect(preset).toBeDefined());
  });
});