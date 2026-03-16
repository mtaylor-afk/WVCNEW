import { getSupabase, isSupabaseConfigured } from "./supabase";
import type { Quote } from "./types";

// IndexedDB fallback using idb
async function getIDB() {
  if (typeof window === "undefined") return null;
  const { openDB } = await import("idb");
  return openDB("wvc-quotes", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("quotes")) {
        const store = db.createObjectStore("quotes", { keyPath: "ref" });
        store.createIndex("created_at", "created_at");
      }
      if (!db.objectStoreNames.contains("pending-ops")) {
        db.createObjectStore("pending-ops", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveQuote(quote: Quote): Promise<Quote> {
  const now = new Date().toISOString();
  const quoteToSave = {
    ...quote,
    updated_at: now,
    created_at: quote.created_at || now,
  };

  // Save to IndexedDB always
  const db = await getIDB();
  if (db) {
    await db.put("quotes", quoteToSave);
  }

  // Try Supabase
  const client = getSupabase();
  if (isSupabaseConfigured() && client) {
    const { data, error } = await client
      .from("quotes")
      .upsert(quoteToSave, { onConflict: "ref" })
      .select()
      .single();

    if (!error && data) return data as Quote;
  }

  return quoteToSave;
}

export async function loadQuotes(): Promise<Quote[]> {
  const client = getSupabase();
  // Try Supabase first
  if (isSupabaseConfigured() && client) {
    const { data, error } = await client
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Sync to IndexedDB
      const db = await getIDB();
      if (db) {
        const tx = db.transaction("quotes", "readwrite");
        for (const quote of data) {
          await tx.store.put(quote);
        }
        await tx.done;
      }
      return data as Quote[];
    }
  }

  // Fallback to IndexedDB
  const db = await getIDB();
  if (db) {
    const all = await db.getAll("quotes");
    return (all as Quote[]).sort(
      (a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  }

  return [];
}

export async function deleteQuote(ref: string): Promise<void> {
  const db = await getIDB();
  if (db) {
    await db.delete("quotes", ref);
  }

  const client = getSupabase();
  if (isSupabaseConfigured() && client) {
    await client.from("quotes").delete().eq("ref", ref);
  }
}

export async function getQuote(ref: string): Promise<Quote | null> {
  const client = getSupabase();
  if (isSupabaseConfigured() && client) {
    const { data } = await client
      .from("quotes")
      .select("*")
      .eq("ref", ref)
      .single();
    if (data) return data as Quote;
  }

  const db = await getIDB();
  if (db) {
    return (await db.get("quotes", ref)) as Quote || null;
  }

  return null;
}
