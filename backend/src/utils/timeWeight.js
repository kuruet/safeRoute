export function getTimeWeight(createdAt) {

  const ageInDays =
    (Date.now() - new Date(createdAt).getTime()) /
    (1000 * 60 * 60 * 24);

  // recent incidents matter most

  if (ageInDays <= 7) return 1.0;

  if (ageInDays <= 30) return 0.7;

  if (ageInDays <= 90) return 0.4;

  return 0.2;

}