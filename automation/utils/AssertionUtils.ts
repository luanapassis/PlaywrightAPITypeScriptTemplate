export class AssertionUtils {
    static async assertAll(assertions: (() => void)[]) {
      const errors: string[] = [];
  
      for (const assertion of assertions) {
        try {
          assertion();
        } catch (e: any) {
          errors.push(e.message);
        }
      }
  
      if (errors.length > 0) {
        throw new Error('Validation errors:\n' + errors.join('\n'));
      }
    }
  }
  