import { DataTable } from './data-table';

describe('DataTable', () => {
  it('should create an instance', () => {
    expect(new DataTable([], 10)).toBeTruthy();
  });
});
