import { GzDatePipe } from './gz-date.pipe';

describe('DatePipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new GzDatePipe();
  
    it('transforms "Now-2hours"', () => {
      var d = new Date();
      d.setHours(d.getHours() - 2);
      expect(pipe.transform(d)).toBe(`ma`);
    });

    it('transforms TODAY 00:00 to Today', () => {
        let today = new Date();
        // Sample RFC3339: 2021-03-20T10:43:54.956950524+00:00
        let today_str = today.toISOString().split('T')[0];
        var d = new Date(`${today_str}T00:00:00+00:00`);
        expect(pipe.transform(d)).toBe(`ma`);
      });

      it('transforms YESTERDAY 00:00 to Yesterday', () => {
        let today = new Date();
        today.setHours(today.getHours()-24);
        let today_str = today.toISOString().split('T')[0];
        var d = new Date(`${today_str}T00:00:00+00:00`);
        expect(pipe.transform(d)).toBe(`tegnap`);
      });
  });