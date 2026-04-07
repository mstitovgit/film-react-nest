import { TSKVLogger } from './tskv-logger';

describe('JsonLogger', () => {
  let logger: TSKVLogger;

  beforeEach(() => {
    logger = new TSKVLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('Should be formatted as JSON', () => {
    const message = 'test message';
    const params = ['optional param 1', 'optional param 2'];
    logger.log(message, ...params);
    expect(console.log).toHaveBeenCalledWith(
      `log\t${message}\t${params.join('\t')}\n`,
    );
  });
});
