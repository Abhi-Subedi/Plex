import { convex } from "@/lib/convex-client";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface ProjectFileEntry {
  _id: Id<"files">;
  name: string;
  type: "file" | "folder";
  parentId?: Id<"files">;
}

/**
 * Splits a tool-provided file name into directory parts + base name.
 * Accepts plain names ("index.tsx") and relative paths ("src/routes/index.tsx").
 * Sanitizes: trims whitespace, converts backslashes, drops empty/`.`/`..` segments.
 */
export function splitFilePath(
  rawName: string,
): { dirs: string[]; base: string } | { error: string } {
  const normalized = rawName.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  const parts = normalized
    .split("/")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && part !== "." && part !== "..");

  if (parts.length === 0) {
    return {
      error: `Invalid file name "${rawName}". Use a plain file name like "index.tsx" or a relative path like "src/index.tsx".`,
    };
  }

  return { dirs: parts.slice(0, -1), base: parts[parts.length - 1] };
}

const sameParent = (
  a: Id<"files"> | undefined,
  b: Id<"files"> | undefined,
) => (a ?? undefined) === (b ?? undefined);

/**
 * Ensures each folder in `dirs` exists under `baseParentId` (creating any
 * missing ones via the system API) and returns the deepest folder's ID.
 * Returns `{ parentId: undefined }` when `dirs` is empty (file goes to base).
 */
export async function ensureFolderPath(args: {
  projectId: Id<"projects">;
  internalKey: string;
  baseParentId: Id<"files"> | undefined;
  dirs: string[];
}): Promise<{ parentId: Id<"files"> | undefined } | { error: string }> {
  const { projectId, internalKey, baseParentId, dirs } = args;

  if (dirs.length === 0) {
    return { parentId: baseParentId };
  }

  const all = (await convex.query(api.system.getProjectFiles, {
    internalKey,
    projectId,
  })) as ProjectFileEntry[];

  let current = baseParentId;

  for (const dir of dirs) {
    const existing = all.find(
      (f) =>
        f.type === "folder" &&
        f.name === dir &&
        sameParent(f.parentId, current),
    );
    if (existing) {
      current = existing._id;
      continue;
    }

    const blocker = all.find(
      (f) =>
        f.type === "file" && f.name === dir && sameParent(f.parentId, current),
    );
    if (blocker) {
      return {
        error: `Cannot create folder "${dir}" because a file with that name already exists there. Pick a different path.`,
      };
    }

    const createdId = (await convex.mutation(api.system.createFolder, {
      internalKey,
      projectId,
      name: dir,
      parentId: current,
    })) as Id<"files">;

    all.push({ _id: createdId, name: dir, type: "folder", parentId: current });
    current = createdId;
  }

  return { parentId: current };
}
