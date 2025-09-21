import { colsValidate, validateResults, getValidationSum } from '../src/validate.js';

describe('validate.js comprehensive testing', () => {
  beforeEach(() => {
    // Clear validation sum before each test
    const validationSum = getValidationSum();
    Object.keys(validationSum).forEach(key => delete validationSum[key]);
  });

  it('should test lighthouseValidateScore functions', () => {
    const lighthouseValidator = colsValidate['scores.performance'];
    
    // Test success cases
    expect(lighthouseValidator.success(95)).toBe(true);
    expect(lighthouseValidator.success(90)).toBe(true);
    expect(lighthouseValidator.success(89)).toBe(false);
    
    // Test warning cases
    expect(lighthouseValidator.warning(89)).toBe(true);
    expect(lighthouseValidator.warning(50)).toBe(true);
    expect(lighthouseValidator.warning(90)).toBe(false);
    
    // Test error cases
    expect(lighthouseValidator.error(49)).toBe(true);
    expect(lighthouseValidator.error(25)).toBe(true);
    expect(lighthouseValidator.error(50)).toBe(false);
  });

  it('should test warnErrorThresholds function with performance metrics', () => {
    // Test first-contentful-paint thresholds (2000, 4000)
    const fcpValidator = colsValidate['first-contentful-paint'];
    expect(fcpValidator.success(1500)).toBe(true);
    expect(fcpValidator.success(2000)).toBe(true);
    expect(fcpValidator.success(2500)).toBe(false);
    
    expect(fcpValidator.warning(2500)).toBe(true);
    expect(fcpValidator.warning(1500)).toBe(false);
    
    expect(fcpValidator.error(4500)).toBe(true);
    expect(fcpValidator.error(3500)).toBe(false);
  });

  it('should test various column validators', () => {
    // Test mixed_content_url
    expect(colsValidate.mixed_content_url.error('http://example.com')).toBe(true);
    expect(colsValidate.mixed_content_url.error('')).toBe(false);
    expect(colsValidate.mixed_content_url.error(null)).toBe(false);
    
    // Test is_canonical
    expect(colsValidate.is_canonical.error(0)).toBe(true);
    expect(colsValidate.is_canonical.error('0')).toBe(true);
    expect(colsValidate.is_canonical.error(1)).toBe(false);
    
    // Test request_time
    expect(colsValidate.request_time.warning(600)).toBe(true);
    expect(colsValidate.request_time.warning(400)).toBe(false);
    expect(colsValidate.request_time.error(1200)).toBe(true);
    expect(colsValidate.request_time.error(800)).toBe(false);
    
    // Test status
    expect(colsValidate.status.error(404)).toBe(true);
    expect(colsValidate.status.error(500)).toBe(true);
    expect(colsValidate.status.error(200)).toBe(false);
    
    // Test title
    expect(colsValidate.title.error('')).toBe(true);
    expect(colsValidate.title.error('Valid Title')).toBe(false);
    
    // Test description
    const longDescription = 'a'.repeat(300);
    expect(colsValidate.description.warning(longDescription)).toBe(true);
    expect(colsValidate.description.warning('Short description')).toBe(false);
  });

  it('should test validateResults with error cases', () => {
    const results = {
      response: { url: 'https://example.com' },
      result: {
        mixed_content_url: 'http://insecure.com',
        is_canonical: 0,
        request_time: 1200,
        status: 404,
        title: '',
        h1_count: 2
      }
    };
    
    const fields = [
      'result.mixed_content_url',
      'result.is_canonical', 
      'result.request_time',
      'result.status',
      'result.title',
      'result.h1_count'
    ];
    
    const validation = validateResults(results, fields);
    
    expect(validation.mixed_content_url.type).toBe('error');
    expect(validation.is_canonical.type).toBe('error');
    expect(validation.request_time.type).toBe('error');
    expect(validation.status.type).toBe('error');
    expect(validation.title.type).toBe('error');
    expect(validation.h1_count.type).toBe('error');
  });

  it('should test validateResults with warning cases', () => {
    const results = {
      response: { url: 'https://example.com' },
      result: {
        request_time: 600,
        description: 'a'.repeat(300),
        h1_count: 0,
        canonical_count: 2,
        dom_size: 2000
      }
    };
    
    const fields = [
      'result.request_time',
      'result.description',
      'result.h1_count', 
      'result.canonical_count',
      'result.dom_size'
    ];
    
    const validation = validateResults(results, fields);
    
    expect(validation.request_time.type).toBe('warning');
    expect(validation.description.type).toBe('warning');
    expect(validation.h1_count.type).toBe('warning');
    expect(validation.canonical_count.type).toBe('warning');
    expect(validation.dom_size.type).toBe('warning');
  });

  it('should test custom message functions', () => {
    const results = {
      response: { url: 'https://example.com' },
      result: {
        title: '',
        description: 'a'.repeat(300)
      }
    };
    
    const fields = ['result.title', 'result.description'];
    const validation = validateResults(results, fields);
    
    // Test errorMsg function for title
    expect(validation.title.msg).toBe(0); // length of empty string
    
    // Test warningMsg function for description
    expect(validation.description.msg).toBe(300); // length of long string
  });

  it('should test getValidationSum accumulation', () => {
    const results1 = {
      response: { url: 'https://example1.com' },
      result: { status: 404 }
    };
    
    const results2 = {
      response: { url: 'https://example2.com' },
      result: { status: 500 }
    };
    
    validateResults(results1, ['result.status']);
    validateResults(results2, ['result.status']);
    
    const validationSum = getValidationSum();
    expect(validationSum.status).toBeDefined();
    expect(validationSum.status.length).toBe(2);
    expect(validationSum.status[0].url).toBe('https://example1.com');
    expect(validationSum.status[1].url).toBe('https://example2.com');
  });

  it('should handle missing validators gracefully', () => {
    const results = {
      response: { url: 'https://example.com' },
      result: { nonexistent_field: 'value' }
    };
    
    const validation = validateResults(results, ['result.nonexistent_field']);
    expect(Object.keys(validation).length).toBe(0);
  });
});