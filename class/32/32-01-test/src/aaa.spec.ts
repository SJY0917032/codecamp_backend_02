// TestCase Only One
it('더하기 테스트', () => {
  const a = 1;
  const b = 1;

  expect(a + b).toBe(2);
});

// TestCase Many
describe('Test Group', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 1;

    expect(a + b).toBe(2);
  });
  it('곱하기 테스트', () => {
    const a = 2;
    const b = 2;

    expect(a * b).toBe(4);
  });
});

// TestCase API
describe('Test Product API', () => {
  // 로그인을 먼저 테스트한다
  // 밑에는 로그인 로직이 작성됨
  beforeEach(() => {
    const result = true;
    expect(result).toBe(true);
  });

  it('Money Check', () => {
    const result = true;
    expect(result).toBe(true);
  });

  it('Buy Check', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
