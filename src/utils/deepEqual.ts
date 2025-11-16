// thanks claude

export function deepEqual<T>(obj1: T, obj2: T): boolean {
  // Same reference
  if (obj1 === obj2) return true;

  // Null/undefined checks
  if (obj1 == null || obj2 == null) return false;

  // Different types
  if (typeof obj1 !== typeof obj2) return false;

  // Primitives
  if (typeof obj1 !== 'object') return obj1 === obj2;

  // Arrays
  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2)) return false;
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }

  // Dates
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  // Objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    return deepEqual((obj1 as any)[key], (obj2 as any)[key]);
  });
}
