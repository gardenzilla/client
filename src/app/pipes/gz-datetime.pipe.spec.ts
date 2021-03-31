import { GzDateTimePipe } from './gz-datetime.pipe';

describe('DateTimePipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new GzDateTimePipe();
  
    it('transforms "Now-2hours"', () => {
      var d = new Date();
      d.setHours(d.getHours() - 2);
      expect(pipe.transform(d)).toBe(`ma, ${d.getHours()}:${d.getMinutes()}`);
    });

    it('transforms "Now-24hours"', () => {
      var d = new Date();
      d.setHours(d.getHours() - 24);
      expect(pipe.transform(d)).toBe(`tegnap, ${d.getHours()}:${d.getMinutes()}`);
    });

    it('transforms "Now-48hours"', () => {
      var d = new Date();
      d.setHours(d.getHours() - 48);
      expect(pipe.transform(d)).toBe(`tegnapelőtt, ${d.getHours()}:${d.getMinutes()}`);
    });

    it('transforms "Now-48hours"', () => {
      var d = new Date();
      d.setHours(d.getHours() - 48);
      expect(pipe.transform(d)).toBe(`tegnapelőtt, ${d.getHours()}:${d.getMinutes()}`);
    });

    it('transforms "custom"', () => {
      var d = new Date('2021-03-20T10:43:54.956950524+00:00');
      expect(pipe.transform(d)).toBe(`tegnap, 11:43`);
    });
  });