describe('Preset scraperFields module', () => {
  it('should load scraperFields preset successfully', async () => {
    const { default: scraperFields } = await import('../src/presets/scraperFields.js');
    expect(scraperFields).toBeDefined();
    expect(typeof scraperFields).toBe('object');
    
    // Access all preset properties to trigger coverage
    expect(scraperFields.default).toBeDefined();
    expect(scraperFields.minimal).toBeDefined();
    expect(scraperFields["seo-minimal"]).toBeDefined();
    expect(scraperFields.seo).toBeDefined();
    expect(scraperFields.headers).toBeDefined();
    expect(scraperFields.parse).toBeDefined();
    expect(scraperFields.lighthouse).toBeDefined();
    expect(scraperFields['lighthouse-all']).toBeDefined();
  });

  it('should access all scraper field arrays', async () => {
    const { default: scraperFields } = await import('../src/presets/scraperFields.js');
    
    // Access each preset array to trigger all lines
    Object.keys(scraperFields).forEach(presetKey => {
      const fieldArray = scraperFields[presetKey];
      expect(Array.isArray(fieldArray)).toBe(true);
      expect(fieldArray.length).toBeGreaterThan(0);
      
      // Access each field in the array
      fieldArray.forEach(field => {
        expect(typeof field).toBe('string');
        expect(field.length).toBeGreaterThan(0);
      });
    });
  });

  it('should verify specific preset contents', async () => {
    const { default: scraperFields } = await import('../src/presets/scraperFields.js');
    
    // Test specific presets
    expect(scraperFields.default).toContain('response.url');
    expect(scraperFields.minimal).toContain('response.url');
    expect(scraperFields["seo-minimal"]).toContain('result.title');
    expect(scraperFields.lighthouse).toContain('lighthouse.scores.performance');
    expect(scraperFields['lighthouse-all']).toContain('lighthouse.scores.performance');
    
    // Test that lighthouse-all has more fields than lighthouse
    expect(scraperFields['lighthouse-all'].length).toBeGreaterThan(scraperFields.lighthouse.length);
  });
});