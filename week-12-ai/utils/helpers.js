/**
 * Escapes special regex characters so the string can be
 * safely embedded inside a RegExp constructor.
 */
export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
