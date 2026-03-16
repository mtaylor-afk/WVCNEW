import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const STORAGE_BUCKET = "quote-assets";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return Boolean(
    url &&
      key &&
      url !== "your_supabase_project_url" &&
      url.startsWith("http")
  );
}

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Convenience export for direct access (lazy)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      // Return a no-op proxy for chained calls
      return () => ({ data: null, error: new Error("Supabase not configured") });
    }
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

export async function uploadFile(
  path: string,
  file: Blob,
  contentType: string
): Promise<string | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { contentType, upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  return data.path;
}

export async function getSignedUrl(path: string): Promise<string | null> {
  const client = getSupabase();
  if (!client || !path) return null;

  const { data, error } = await client.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, 3600);

  if (error) return null;
  return data.signedUrl;
}

export async function deleteFile(path: string): Promise<void> {
  const client = getSupabase();
  if (!client) return;
  await client.storage.from(STORAGE_BUCKET).remove([path]);
}
