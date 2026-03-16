"use client";

import { useState, useEffect } from "react";
import {
  Save, Trash2, CheckCircle, AlertCircle,
  Clock, Eye, EyeOff, RefreshCw, Info
} from "lucide-react";
import { toast } from "sonner";
import { GoldButton } from "@/components/ui/GoldButton";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingInput";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";
import type { AppSettings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/types";
import { cn } from "@/lib/utils";

function MaskedInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block font-syne text-xs text-gold font-semibold mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter key..."}
          className="w-full px-4 py-3 pr-12 bg-navy/5 border border-navy/20 rounded-xl text-navy font-mono text-sm focus:outline-none focus:border-gold"
        />
        <button
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 touch-target"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error" | "unconfigured">("checking");
  const [lastSync, setLastSync] = useState<string | null>(null);

  const check = async () => {
    setStatus("checking");
    if (!isSupabaseConfigured()) {
      setStatus("unconfigured");
      return;
    }
    try {
      const client = getSupabase();
      if (!client) { setStatus("unconfigured"); return; }
      const { error } = await client.from("quotes").select("id").limit(1);
      if (error) throw error;
      setStatus("connected");
      setLastSync(new Date().toLocaleTimeString());
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { check(); }, []);

  const colours = {
    checking: "text-gold",
    connected: "text-green-500",
    error: "text-red-500",
    unconfigured: "text-navy/40",
  };

  const icons = {
    checking: <RefreshCw size={16} className="animate-spin" />,
    connected: <CheckCircle size={16} />,
    error: <AlertCircle size={16} />,
    unconfigured: <Info size={16} />,
  };

  const labels = {
    checking: "Checking connection...",
    connected: "Connected to Supabase",
    error: "Connection failed",
    unconfigured: "Not configured",
  };

  return (
    <div className="flex items-center justify-between">
      <div className={cn("flex items-center gap-2 font-syne text-sm", colours[status])}>
        {icons[status]}
        <span>{labels[status]}</span>
      </div>
      <div className="flex items-center gap-3">
        {lastSync && (
          <span className="font-syne text-navy/40 text-xs flex items-center gap-1">
            <Clock size={11} />
            {lastSync}
          </span>
        )}
        <button
          onClick={check}
          className="font-syne text-xs text-gold touch-target px-2"
        >
          Recheck
        </button>
      </div>
    </div>
  );
}

const SETTINGS_KEY = "wvc-settings";

function loadSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const update = (key: keyof AppSettings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleClearData = async () => {
    try {
      localStorage.clear();
      const { openDB } = await import("idb");
      const db = await openDB("wvc-quotes", 1);
      await db.clear("quotes");
      toast.success("Local data cleared");
      setShowClearConfirm(false);
    } catch {
      toast.error("Failed to clear data");
    }
  };

  return (
    <div className="h-full scroll-area bg-cream/20">
      <div className="p-4 space-y-4 pb-28">
        {/* Supabase Status */}
        <CollapsibleCard title="Connection Status" defaultOpen>
          <SupabaseStatus />
        </CollapsibleCard>

        {/* VAT Settings */}
        <CollapsibleCard title="VAT Settings" defaultOpen>
          <div className="space-y-3">
            <div>
              <label className="block font-syne text-xs text-gold font-semibold mb-1.5">
                Default VAT Rate (%)
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => update("vatRate", Math.max(0, (settings.vatRate as number) - 1))}
                  className="w-10 h-10 rounded-xl bg-navy/10 text-navy text-xl flex items-center justify-center touch-target"
                >
                  −
                </button>
                <input
                  type="number"
                  value={settings.vatRate}
                  onChange={(e) => update("vatRate", Number(e.target.value))}
                  min={0}
                  max={100}
                  className="flex-1 text-center px-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-mono text-lg font-semibold focus:outline-none focus:border-gold"
                />
                <button
                  onClick={() => update("vatRate", Math.min(100, (settings.vatRate as number) + 1))}
                  className="w-10 h-10 rounded-xl bg-navy/10 text-navy text-xl flex items-center justify-center touch-target"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </CollapsibleCard>

        {/* Company Details */}
        <CollapsibleCard title="Company Details" defaultOpen={false}>
          <div className="space-y-3">
            <FloatingInput
              label="Company Name"
              value={settings.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
            <FloatingTextarea
              label="Company Address"
              value={settings.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
              rows={2}
            />
            <FloatingInput
              label="Phone Number"
              value={settings.companyPhone}
              onChange={(e) => update("companyPhone", e.target.value)}
              type="tel"
            />
            <FloatingInput
              label="Email Address"
              value={settings.companyEmail}
              onChange={(e) => update("companyEmail", e.target.value)}
              type="email"
            />
          </div>
        </CollapsibleCard>

        {/* Default Terms */}
        <CollapsibleCard title="Default Terms & Conditions" defaultOpen={false}>
          <div>
            <textarea
              value={settings.defaultTerms}
              onChange={(e) => update("defaultTerms", e.target.value)}
              rows={10}
              className="w-full px-3 py-3 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-xs resize-none focus:outline-none focus:border-gold"
            />
          </div>
        </CollapsibleCard>

        {/* API Keys */}
        <CollapsibleCard title="API Configuration" defaultOpen={false}>
          <div className="space-y-4">
            <div className="p-3 bg-gold/10 rounded-xl">
              <p className="font-syne text-navy/70 text-xs">
                API keys are stored locally on this device only. The Anthropic key is used server-side for quote and design generation.
              </p>
            </div>
            <MaskedInput
              label="Anthropic API Key (server-side)"
              value={settings.anthropicApiKey || ""}
              onChange={(v) => update("anthropicApiKey", v)}
              placeholder="sk-ant-..."
            />
            <MaskedInput
              label="Replicate API Token (optional, for image generation)"
              value={settings.replicateApiKey || ""}
              onChange={(v) => update("replicateApiKey", v)}
              placeholder="r8_..."
            />
          </div>
        </CollapsibleCard>

        {/* Save button */}
        <GoldButton size="lg" onClick={handleSave} loading={saving} className="w-full">
          <Save size={18} />
          Save Settings
        </GoldButton>

        {/* Danger zone */}
        <div className="card-cream p-4">
          <h3 className="font-cormorant font-semibold text-navy text-lg mb-2">Danger Zone</h3>
          {showClearConfirm ? (
            <div className="space-y-3">
              <p className="font-syne text-navy/60 text-sm">
                This will delete all locally stored quotes and settings. Are you sure?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-navy/20 font-syne font-semibold text-navy touch-target"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  className="flex-1 py-3 rounded-xl bg-red-500 font-syne font-semibold text-white touch-target"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full py-3 rounded-xl border-2 border-red-200 text-red-500 font-syne font-semibold flex items-center justify-center gap-2 touch-target"
            >
              <Trash2 size={16} />
              Clear All Local Data
            </button>
          )}
        </div>

        {/* App info */}
        <div className="text-center space-y-1 pb-4">
          <p className="font-mono text-navy/30 text-xs">WV Construction · Smart Quote Generator</p>
          <p className="font-mono text-navy/20 text-xs">
            ACOR Building and Property Solutions Ltd · Co. No. 9287377
          </p>
          <p className="font-mono text-navy/20 text-xs">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
