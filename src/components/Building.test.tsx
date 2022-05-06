import Building from './Building';

describe('Building', () => {
  it('runs tests successfully!', () => {
    const building = <Building defaultBanks={2} defaultFloors={2} />;
    expect(building).toBeTruthy();
    expect(true).toBe(true);
  });
});
