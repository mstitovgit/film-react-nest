import { JsonLogger } from './json-logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('Should be formatted as JSON', () => {
    const message = 'test message';
    const params = ['optional param 1', 'optional param 2'];
    logger.log(message, ...params);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({ level: 'log', message, optionalParams: params }),
    );
  });
});
