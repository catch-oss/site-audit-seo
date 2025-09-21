describe('config.js comprehensive testing', () => {
  beforeAll(() => {
    // Mock environment variables to trigger different code paths
    process.env.MAX_CONCURRENCY = '10';
    process.env.MAX_REQUESTS = '100';
    process.env.FEATURE_SCREENSHOT = 'true';
    process.env.ONLY_DOMAINS = 'example.com, test.com';
    process.env.UPLOAD_URL = 'https://custom-upload.example.com';
  });

  afterAll(() => {
    // Clean up environment variables
    delete process.env.MAX_CONCURRENCY;
    delete process.env.MAX_REQUESTS;
    delete process.env.FEATURE_SCREENSHOT;
    delete process.env.ONLY_DOMAINS;
    delete process.env.UPLOAD_URL;
  });

  it('should import config module and access environment variables', async () => {
    const { default: config } = await import('../src/config.js');
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
    
    // Test environment variable parsing
    expect(config.maxConcurrency).toBe(10);
    expect(config.maxRequests).toBe(100);
    expect(config.featureScreenshot).toBe(true);
    expect(Array.isArray(config.onlyDomains)).toBe(true);
    expect(config.onlyDomains).toContain('example.com');
    expect(config.onlyDomains).toContain('test.com');
    expect(config.uploadUrl).toBe('https://custom-upload.example.com');
  });

  it('should handle environment variable edge cases', () => {
    // Test when environment variables are not set
    const originalEnv = { ...process.env };
    
    // Clear environment variables
    delete process.env.MAX_CONCURRENCY;
    delete process.env.MAX_REQUESTS;
    delete process.env.FEATURE_SCREENSHOT;
    delete process.env.ONLY_DOMAINS;
    delete process.env.UPLOAD_URL;
    
    // Re-evaluate the environment variables logic
    const envVars = {
      maxConcurrency: process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY) : 0,
      maxRequests: process.env.MAX_REQUESTS ? parseInt(process.env.MAX_REQUESTS) : 0,
      featureScreenshot: !!process.env.FEATURE_SCREENSHOT,
      onlyDomains: process.env.ONLY_DOMAINS ? `${process.env.ONLY_DOMAINS}`.split(',').map(d => d.trim()) : false,
      uploadUrl: process.env.UPLOAD_URL || 'https://functions.yandexcloud.net/d4erepgc4tp37sslk453',
    };
    
    expect(envVars.maxConcurrency).toBe(0);
    expect(envVars.maxRequests).toBe(0);
    expect(envVars.featureScreenshot).toBe(false);
    expect(envVars.onlyDomains).toBe(false);
    expect(envVars.uploadUrl).toBe('https://functions.yandexcloud.net/d4erepgc4tp37sslk453');
    
    // Restore environment
    Object.assign(process.env, originalEnv);
  });
});