export const temp = (t: number) => `${Math.round(t)}°`;

export const generateKey = (pre = 'id') => `${pre}_${new Date().getTime()}`;
