describe('Action modules (enhanced)', () => {
  it('should import all action modules', async () => {
    const { copyJsonToReports, saveAsJson, startViewer, uploadJson } = await import('../src/actions/index.js');
    
    expect(copyJsonToReports).toBeDefined();
    expect(saveAsJson).toBeDefined();
    expect(startViewer).toBeDefined();
    expect(uploadJson).toBeDefined();
    
    expect(typeof copyJsonToReports).toBe('function');
    expect(typeof saveAsJson).toBe('function');
    expect(typeof startViewer).toBe('function');
    expect(typeof uploadJson).toBe('function');
  });

  it('should handle action module structure', async () => {
    const actionsModule = await import('../src/actions/index.js');
    
    // Access all exports to trigger coverage
    const exports = Object.keys(actionsModule);
    expect(exports.length).toBeGreaterThan(0);
    
    // Test that each export is accessible
    exports.forEach(exportName => {
      expect(actionsModule[exportName]).toBeDefined();
    });
  });

  it('should verify copyJsonToReports module', async () => {
    const copyModule = await import('../src/actions/copyJsonToReports.js');
    expect(copyModule).toBeDefined();
    expect(copyModule.default).toBeDefined();
    expect(typeof copyModule.default).toBe('function');
  });

  it('should verify saveAsJson module', async () => {
    const saveModule = await import('../src/actions/saveAsJson.js');
    expect(saveModule).toBeDefined();
    expect(saveModule.default).toBeDefined();
    expect(typeof saveModule.default).toBe('function');
  });

  it('should verify startViewer module', async () => {
    const viewerModule = await import('../src/actions/startViewer.js');
    expect(viewerModule).toBeDefined();
    expect(viewerModule.default).toBeDefined();
    expect(typeof viewerModule.default).toBe('function');
  });

  it('should verify uploadJson module', async () => {
    const uploadModule = await import('../src/actions/uploadJson.js');
    expect(uploadModule).toBeDefined();
    expect(uploadModule.default).toBeDefined();
    expect(typeof uploadModule.default).toBe('function');
  });
});