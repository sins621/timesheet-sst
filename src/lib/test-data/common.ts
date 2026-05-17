export const getTestData = <T>(count: number, generator: () => T): T[] => {
  return Array.from({ length: count }, generator);
};
