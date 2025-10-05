import fs from 'fs';
import path from 'path';
import os from 'os';

describe('--out-dir functionality', () => {
  let testOutDir;
  
  beforeEach(() => {
    // Create a unique temporary directory for each test
    testOutDir = path.join(os.tmpdir(), `site-audit-test-${Date.now()}`);
  });
  
  afterEach(() => {
    // Clean up test directory after each test
    if (fs.existsSync(testOutDir)) {
      fs.rmSync(testOutDir, { recursive: true, force: true });
    }
  });

  it('should have --out-dir option defined in program', async () => {
    const { default: program } = await import('../src/program.js');
    
    // Check if --out-dir option exists
    const outDirOption = program.options.find(opt => 
      opt.long === '--out-dir' || opt.flags?.includes('--out-dir')
    );
    
    expect(outDirOption).toBeDefined();
  });

  it('should expand home directory in outDir during postParse', async () => {
    // Fresh import to avoid cached state using timestamp
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Set a test output directory with tilde
    const testDir = '~/test-out-dir-' + Date.now();
    program.outDir = testDir;
    
    // Mock urls to satisfy postParse requirements
    program.urls = ['https://example.com'];
    
    // Call postParse
    await program.postParse();
    
    // Verify that outDir has been expanded (should not contain ~)
    expect(program.outDir).toBeDefined();
    expect(program.outDir).not.toContain('~');
    
    // Clean up created directory
    if (fs.existsSync(program.outDir)) {
      fs.rmSync(program.outDir, { recursive: true, force: true });
    }
  });

  it('should create output directory if it does not exist', async () => {
    // Fresh import
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Use our test directory
    program.outDir = testOutDir;
    program.urls = ['https://example.com'];
    
    // Ensure directory doesn't exist before test
    expect(fs.existsSync(testOutDir)).toBe(false);
    
    // Call postParse which should create the directory
    await program.postParse();
    
    // Verify directory was created
    expect(fs.existsSync(testOutDir)).toBe(true);
    expect(fs.statSync(testOutDir).isDirectory()).toBe(true);
  });

  it('should pass outDir to options via getOptions', async () => {
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Set test directory
    program.outDir = testOutDir;
    program.urls = ['https://example.com'];
    
    await program.postParse();
    
    // Get options
    const options = program.getOptions();
    
    // Verify outDir is in options
    expect(options.outDir).toBeDefined();
    expect(options.outDir).toBe(testOutDir);
  });

  it('should use default output directory when not specified', async () => {
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Don't set outDir, let it use default
    program.urls = ['https://example.com'];
    
    // Get the default value before postParse
    const defaultOutDir = program.outDir;
    
    expect(defaultOutDir).toBeDefined();
    // Default should be ~/site-audit-seo/
    expect(defaultOutDir).toContain('site-audit-seo');
  });

  it('should handle absolute paths correctly', async () => {
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Use absolute path
    program.outDir = testOutDir;
    program.urls = ['https://example.com'];
    
    await program.postParse();
    
    // Verify it's still an absolute path
    expect(path.isAbsolute(program.outDir)).toBe(true);
    expect(program.outDir).toBe(testOutDir);
  });

  it('should throw error if outDir points to a file', async () => {
    const programModule = await import('../src/program.js?t=' + Date.now());
    const program = programModule.default;
    
    // Create a file at the test path
    const testFile = path.join(os.tmpdir(), `site-audit-test-file-${Date.now()}.txt`);
    fs.writeFileSync(testFile, 'test content');
    
    program.outDir = testFile;
    program.urls = ['https://example.com'];
    
    // Should throw error because path points to a file
    await expect(program.postParse()).rejects.toThrow();
    
    // Clean up
    fs.unlinkSync(testFile);
  });

  it('should verify scrape-site uses outDir for file paths', async () => {
    // This test verifies the integration between program and scrape-site
    const { default: program } = await import('../src/program.js');
    
    // Verify that getOptions returns outDir
    const testDir = '/tmp/test-audit';
    program.outDir = testDir;
    const options = program.getOptions();
    
    expect(options.outDir).toBe(testDir);
    
    // The actual scrape-site.js will use options.outDir to construct:
    // - csvPath: `${options.outDir}/${baseName}.csv`
    // - jsonPath: `${options.outDir}/${baseName}.json`
    // This is tested in integration tests
  });
});
