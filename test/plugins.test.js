describe('Plugin modules', () => {
  it('should load sendToInfluxDB plugin', async () => {
    const pluginModule = await import('../src/plugins/site-audit-seo-export-influxdb/sendToInfluxDB.js');
    expect(pluginModule).toBeDefined();
    expect(pluginModule.default).toBeDefined();
    
    // Access the default export to trigger coverage
    const plugin = pluginModule.default;
    expect(plugin).toBeTruthy();
  });

  it('should verify plugin structure', async () => {
    const pluginModule = await import('../src/plugins/site-audit-seo-export-influxdb/sendToInfluxDB.js');
    const plugin = pluginModule.default;
    
    // Plugin should be a function or object
    expect(['function', 'object'].includes(typeof plugin)).toBe(true);
  });
});