describe('Preset filters module', () => {
  it('should load filters preset successfully', async () => {
    const { default: filters } = await import('../src/presets/filters.js');
    expect(filters).toBeDefined();
    expect(Array.isArray(filters)).toBe(true);
    expect(filters.length).toBeGreaterThan(0);
  });

  it('should access all filter properties', async () => {
    const { default: filters } = await import('../src/presets/filters.js');
    
    // Access each filter to trigger all lines of coverage
    filters.forEach(filter => {
      expect(filter.name).toBeDefined();
      expect(filter.q).toBeDefined();
      expect(filter.groups).toBeDefined();
      expect(Array.isArray(filter.groups)).toBe(true);
      
      // Access array elements
      filter.groups.forEach(group => {
        expect(group).toBeDefined();
        expect(typeof group).toBe('string');
      });
    });
  });

  it('should verify specific filter content', async () => {
    const { default: filters } = await import('../src/presets/filters.js');
    
    // Test that we can access specific filters
    const performanceFilter = filters.find(f => f.name.includes('PageSpeed'));
    expect(performanceFilter).toBeDefined();
    expect(performanceFilter.q).toContain('lighthouse_scores_performance');
    
    const requestTimeFilter = filters.find(f => f.name.includes('Request time'));
    expect(requestTimeFilter).toBeDefined();
    expect(requestTimeFilter.q).toContain('request_time');
  });
});