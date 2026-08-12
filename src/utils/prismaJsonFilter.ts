import { Prisma } from '@prisma/client';

type JsonFilterOperation = Pick<Prisma.JsonFilter, 'equals' | 'not'>;

function toMysqlJsonPath(path: readonly string[]): string {
  if (path.length === 0 || path.some((segment) => !segment)) {
    throw new Error('JSON filter path must contain at least one non-empty property');
  }

  return path.reduce(
    (jsonPath, segment) =>
      /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(segment)
        ? `${jsonPath}.${segment}`
        : `${jsonPath}.${JSON.stringify(segment)}`,
    '$',
  );
}

/** Builds Prisma JSON filters for selected database provider. */
export function prismaJsonFilter(path: readonly string[], operation: JsonFilterOperation): Prisma.JsonFilter {
  const jsonPath =
    process.env.DATABASE_PROVIDER?.toLowerCase() === 'mysql' ? toMysqlJsonPath(path) : [...path];

  return { path: jsonPath, ...operation } as Prisma.JsonFilter;
}
