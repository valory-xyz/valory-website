export const BLOCKED_REGIONS = ['UA-14', 'UA-09', 'UA-65', 'UA-23'];

export const isBlockedRegion = (
  region: string | string[] | null | undefined,
): boolean => {
  const value = Array.isArray(region) ? region[0] : region;
  return !!value && BLOCKED_REGIONS.includes(value);
};
