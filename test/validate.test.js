import { validateResults, getValidationSum, colsValidate } from '../src/validate.js';

describe('validate.js', () => {
  beforeEach(() => {
    // Clear validation sum between tests
    const sum = getValidationSum();
    Object.keys(sum).forEach(key => delete sum[key]);
  });

  describe('colsValidate', () => {
    it('should export validation rules object', () => {
      expect(colsValidate).toBeDefined();
      expect(typeof colsValidate).toBe('object');
    });

    it('should have mixed_content_url validation', () => {
      expect(colsValidate.mixed_content_url).toBeDefined();
      expect(colsValidate.mixed_content_url.error).toBeDefined();
      expect(typeof colsValidate.mixed_content_url.error).toBe('function');
    });

    it('should validate mixed_content_url correctly', () => {
      expect(colsValidate.mixed_content_url.error('http://insecure.com')).toBe(true);
      expect(colsValidate.mixed_content_url.error('')).toBe(false);
      expect(colsValidate.mixed_content_url.error(null)).toBe(false);
    });

    it('should have status validation rules', () => {
      expect(colsValidate.status).toBeDefined();
      expect(colsValidate.status.error).toBeDefined();
      expect(colsValidate.status.error(200)).toBe(false);
      expect(colsValidate.status.error(404)).toBe(true);
      expect(colsValidate.status.error(500)).toBe(true);
    });

    it('should have title validation rules', () => {
      expect(colsValidate.title).toBeDefined();
      expect(colsValidate.title.error).toBeDefined();
      expect(colsValidate.title.error('')).toBe(true);
      expect(colsValidate.title.error('Valid Title')).toBe(false);
      expect(colsValidate.title.error(null)).toBe(false); // null?.length === undefined, not 0
    });

    it('should have description validation rules', () => {
      expect(colsValidate.description).toBeDefined();
      expect(colsValidate.description.warning).toBeDefined();
      
      const longDesc = 'a'.repeat(300);
      const shortDesc = 'Short description';
      
      expect(colsValidate.description.warning(longDesc)).toBe(true);
      expect(colsValidate.description.warning(shortDesc)).toBe(false);
    });

    it('should have request_time validation rules', () => {
      expect(colsValidate.request_time).toBeDefined();
      expect(colsValidate.request_time.warning(600)).toBe(true);
      expect(colsValidate.request_time.warning(300)).toBe(false);
      expect(colsValidate.request_time.error(1200)).toBe(true);
      expect(colsValidate.request_time.error(800)).toBe(false);
    });

    it('should have h1_count validation rules', () => {
      expect(colsValidate.h1_count).toBeDefined();
      expect(colsValidate.h1_count.warning(0)).toBe(true);
      expect(colsValidate.h1_count.warning(1)).toBe(false);
      expect(colsValidate.h1_count.error(2)).toBe(true);
      expect(colsValidate.h1_count.error(1)).toBe(false);
    });
  });

  describe('validateResults', () => {
    const mockResults = {
      response: { status: 404, url: 'https://example.com' },
      title: '',
      description: 'a'.repeat(300)
    };

    it('should validate results against field rules', () => {
      const fields = ['response.status', 'title', 'description'];
      const validation = validateResults(mockResults, fields);
      
      expect(validation).toBeDefined();
      expect(typeof validation).toBe('object');
    });

    it('should identify status errors', () => {
      const fields = ['response.status'];
      const validation = validateResults(mockResults, fields);
      
      expect(validation.status).toBeDefined();
      expect(validation.status.type).toBe('error');
    });

    it('should identify title errors', () => {
      const fields = ['title'];
      const validation = validateResults(mockResults, fields);
      
      expect(validation.title).toBeDefined();
      expect(validation.title.type).toBe('error');
    });

    it('should identify description warnings', () => {
      const fields = ['description'];
      const validation = validateResults(mockResults, fields);
      
      expect(validation.description).toBeDefined();
      expect(validation.description.type).toBe('warning');
    });

    it('should handle results with no validation issues', () => {
      const goodResults = {
        response: { status: 200, url: 'https://example.com' },
        title: 'Good Title',
        description: 'Good short description'
      };
      
      const fields = ['response.status', 'title', 'description'];
      const validation = validateResults(goodResults, fields);
      
      expect(Object.keys(validation)).toHaveLength(0);
    });

    it('should skip fields without validation rules', () => {
      const fields = ['nonexistent_field'];
      const validation = validateResults(mockResults, fields);
      
      expect(Object.keys(validation)).toHaveLength(0);
    });

    it('should use custom error messages when available', () => {
      const fields = ['title'];
      const validation = validateResults(mockResults, fields);
      
      expect(validation.title.msg).toBeDefined();
    });
  });

  describe('getValidationSum', () => {
    it('should return validation summary object', () => {
      const sum = getValidationSum();
      
      expect(sum).toBeDefined();
      expect(typeof sum).toBe('object');
    });

    it('should accumulate validation results', () => {
      const mockResults = {
        response: { status: 404, url: 'https://example.com' }
      };
      
      validateResults(mockResults, ['response.status']);
      const sum = getValidationSum();
      
      expect(sum.status).toBeDefined();
      expect(Array.isArray(sum.status)).toBe(true);
    });

    it('should handle multiple validations', () => {
      const mockResults1 = {
        response: { status: 404, url: 'https://example.com' }
      };
      const mockResults2 = {
        response: { status: 500, url: 'https://test.com' }
      };
      
      validateResults(mockResults1, ['response.status']);
      validateResults(mockResults2, ['response.status']);
      
      const sum = getValidationSum();
      expect(sum.status).toHaveLength(2);
    });
  });
});