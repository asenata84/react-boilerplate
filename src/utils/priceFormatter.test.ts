import priceFormatter from './priceFormatter';

// ---------- functions ----------
describe('functions', () => {
  // priceFormatter
  it('priceFormatter should format the value correctly', () => {
    const payload = 10;
    const result = priceFormatter('bg', 'BGN').format(payload);
    const formatted = result.replace(/\s/g, '') === '10,00лв.' ? '10,00лв.' : 'BGN10.00';

    expect(result.replace(/\s/g, '')).toEqual(formatted);
  });

  it('priceFormatter should scale the value correctly with default currency and locale', () => {
    const payload = 10;
    const result = priceFormatter().format(payload);

    expect(result).toEqual('$10.00');
  });
});
// ---------- end functions ----------
