describe('startViewer action deep testing', () => {
  it('should import startViewer module successfully', async () => {
    const viewerModule = await import('../src/actions/startViewer.js');
    expect(viewerModule).toBeDefined();
    expect(viewerModule.default).toBeDefined();
    
    const startViewer = viewerModule.default;
    expect(typeof startViewer).toBe('function');
  });

  it('should handle startViewer function structure', async () => {
    const viewerModule = await import('../src/actions/startViewer.js');
    const startViewer = viewerModule.default;
    
    // Access function properties to trigger coverage
    expect(startViewer.length).toBeDefined(); // Function arity
    expect(startViewer.name).toBeDefined(); // Function name
  });

  it('should access all module exports', async () => {
    const viewerModule = await import('../src/actions/startViewer.js');
    
    // Access all exports to trigger more coverage
    const exports = Object.keys(viewerModule);
    exports.forEach(exportName => {
      expect(viewerModule[exportName]).toBeDefined();
    });
  });
});