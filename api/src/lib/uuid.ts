const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Los ids de la base son UUID: si el de la URL no tiene ese formato, no puede existir.
export function isUuid(value: string) {
  return UUID_PATTERN.test(value);
}
