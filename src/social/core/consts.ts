export const lolTeams = {
  t1: 'T1',
  gen: 'GEN',
  kt: 'KT',
  hle: 'HLE',
  dk: 'DK',
  ns: 'NS',
  bfx: 'BFX',
  BRO: 'BRO',
  drx: 'DRX',
  dns: 'DNS',
} as const;

export type TLolTeams = (typeof lolTeams)[keyof typeof lolTeams];
