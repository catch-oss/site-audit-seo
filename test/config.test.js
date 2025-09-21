describe('config.js', () => {
  beforeEach(() => {
    
    // Clear environment variables
    delete process.env.MAX_CONCURRENCY;
    delete process.env.MAX_REQUESTS; 
    delete process.env.FEATURE_SCREENSHOT;
    delete process.env.ONLY_DOMAINS;
    delete process.env.UPLOAD_URL;
  });

  it('should parse MAX_CONCURRENCY environment variable', () => {
    process.env.MAX_CONCURRENCY = '5';
    
    const maxConcurrency = process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY) : 0;
    
    expect(maxConcurrency).toBe(5);
  });

  it('should parse MAX_REQUESTS environment variable', () => {
    process.env.MAX_REQUESTS = '100';
    
    const maxRequests = process.env.MAX_REQUESTS ? parseInt(process.env.MAX_REQUESTS) : 0;
    
    expect(maxRequests).toBe(100);
  });

  it('should parse FEATURE_SCREENSHOT boolean flag', () => {
    process.env.FEATURE_SCREENSHOT = 'true';
    
    const featureScreenshot = !!process.env.FEATURE_SCREENSHOT;
    
    expect(featureScreenshot).toBe(true);
  });

  it('should parse ONLY_DOMAINS as array', () => {
    process.env.ONLY_DOMAINS = 'example.com, test.com, demo.org';
    
    const onlyDomains = process.env.ONLY_DOMAINS ? 
      `${process.env.ONLY_DOMAINS}`.split(',').map(d => d.trim()) : false;
    
    expect(onlyDomains).toEqual(['example.com', 'test.com', 'demo.org']);
  });

  it('should use default upload URL when not set', () => {
    const defaultUploadUrl = 'https://functions.yandexcloud.net/d4erepgc4tp37sslk453';
    const uploadUrl = process.env.UPLOAD_URL || defaultUploadUrl;
    
    expect(uploadUrl).toBe(defaultUploadUrl);
  });

  it('should handle empty FEATURE_SCREENSHOT as false', () => {
    process.env.FEATURE_SCREENSHOT = '';
    
    const featureScreenshot = !!process.env.FEATURE_SCREENSHOT;
    
    expect(featureScreenshot).toBe(false);
  });
});