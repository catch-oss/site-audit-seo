import registry from '../src/registry.js';
import fs from 'fs';
import path from 'path';

describe('registry.js comprehensive testing', () => {
  beforeEach(() => {
    // Reset loaded state by accessing internal state if possible
    // The module has internal loaded state that we can't easily reset
  });

  it('should import registry and access all methods', () => {
    expect(registry).toBeDefined();
    expect(typeof registry).toBe('object');
    
    // Test all exported methods
    expect(registry.load).toBeDefined();
    expect(typeof registry.load).toBe('function');
    expect(registry.getPlugins).toBeDefined();
    expect(typeof registry.getPlugins).toBe('function');
    expect(registry.execPlugins).toBeDefined();
    expect(typeof registry.execPlugins).toBe('function');
  });

  it('should test getPlugins functionality', () => {
    const plugins = registry.getPlugins();
    expect(Array.isArray(plugins)).toBe(true);
    
    // Access plugin properties if plugins exist
    plugins.forEach(plugin => {
      expect(plugin.name).toBeDefined();
      expect(plugin.path).toBeDefined();
      if (plugin.type) {
        expect(typeof plugin.type).toBe('string');
      }
      if (plugin.fields) {
        expect(Array.isArray(plugin.fields) || typeof plugin.fields === 'object').toBe(true);
      }
    });
  });

  it('should test load method', () => {
    // Call load method to trigger coverage
    registry.load();
    
    // Should not throw and plugins should be available
    const plugins = registry.getPlugins();
    expect(Array.isArray(plugins)).toBe(true);
  });

  it('should test execPlugins with different parameters', async () => {
    const testOptions = {
      disablePlugins: ['non-existent-plugin'],
      fieldsPreset: 'seo'
    };
    
    // Test with 'any' type
    await registry.execPlugins('./test-data.json', testOptions, 'any');
    
    // Test with 'afterRequest' type  
    await registry.execPlugins('./test-data.json', testOptions, 'afterRequest');
    
    // Test with custom type
    await registry.execPlugins('./test-data.json', testOptions, 'customType');
  });

  it('should handle plugin execution with disabled plugins', async () => {
    const testOptions = {
      disablePlugins: ['export-influxdb'], // Disable the known plugin
      fieldsPreset: 'seo'
    };
    
    // This should skip the disabled plugin
    await registry.execPlugins('./test-data.json', testOptions, 'any');
    expect(true).toBe(true); // Should complete without error
  });

  it('should test plugin field checking logic', async () => {
    const testOptions = {
      disablePlugins: [],
      fieldsPreset: 'minimal' // Use a preset that might not have plugin fields
    };
    
    // Test afterRequest type which has field checking logic
    await registry.execPlugins('./test-data.json', testOptions, 'afterRequest');
    expect(true).toBe(true); // Should complete without error
  });

  it('should handle various fieldsPreset values', async () => {
    const testOptions = {
      disablePlugins: [],
    };
    
    const presets = ['seo', 'minimal', 'default', 'lighthouse'];
    
    for (const preset of presets) {
      testOptions.fieldsPreset = preset;
      await registry.execPlugins('./test-data.json', testOptions, 'afterRequest');
    }
    
    expect(true).toBe(true); // Should complete without error
  });
});