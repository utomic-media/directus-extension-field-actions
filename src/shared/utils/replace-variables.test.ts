import { describe, test, expect } from 'vitest';
import { replaceVariables } from './replace-variables';

describe('replaceVariables', () => {
  test('replaces variables with correct values', () => {
    const text = '{{project_url}}';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com');
  });
  
  test('replaces variables followed by content', () => {
    const text = '{{project_url}}/custom-path';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com/custom-path');
  });

  test('handles spaces inside variable placeholders', () => {
    const text = '{{ project_url }}';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com');
  });

  test('handles multiple variables', () => {
    const text = '{{project_url}}/{{custom_path}}.';
    const variables = { project_url: 'https://example.com', custom_path: 'custom-path' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com/custom-path.');
  });

  test('handles empty variables object', () => {
    const text = '{{project_url}}!';
    const variables = {};
    const result = replaceVariables(text, variables);
    expect(result).toBe('{{project_url}}!');
  });

  test('handles empty text', () => {
    const text = '';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('');
  });
  
  test('handles variable with empty value', () => {
    const text = '{{project_url}}';
    const variables = { project_url: '' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('');
  });

  test('keeps unknown placeholders unchanged', () => {
    const text = '{{project_url}}/{{unknown}}.';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com/{{unknown}}.');
  });

  test('handles text without placeholders', () => {
    const text = 'https://example.com';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe(text);
  });

  test('handles placeholders with trailing spaces', () => {
    const text = '{{project_url }}';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com');
  });

  test('handles placeholders with leading spaces', () => {
    const text = '{{ project_url}}';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('https://example.com');
  });

  test('handles placeholders with multiple spaces around key', () => {
    const text = 'Visit {{  project_url  }} for more info.';
    const variables = { project_url: 'https://example.com' };
    const result = replaceVariables(text, variables);
    expect(result).toBe('Visit https://example.com for more info.');
  });
});