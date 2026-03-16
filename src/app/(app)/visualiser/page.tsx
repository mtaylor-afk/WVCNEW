"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, Palette, FileText, Info } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoldButton } from "@/components/ui/GoldButton";
import { fileToBase64, cn } from "@/lib/utils";
import type { DesignConcept } from "@/lib/types";

const STYLE_CHIPS = [
  "Modern", "Traditional", "Scandinavian", "Industrial",
  "Luxury", "Minimalist", "Coastal", "Maximalist",
];

const BUDGET_OPTIONS = [
  { label: "Under £5k", value: "under-5k" },
  { label: "£5k–£15k", value: "5k-15k" },
  { label: "£15k–£30k", value: "15k-30k" },
  { label: "£30k+", value: "30k-plus" },
];

const COMPLEXITY_COLOURS = {
  low: "bg-green-100 text-green-700",
  medium: "bg-gold/10 text-gold",
  high: "bg-red-100 text-red-700",
};

// ─── Room Silhouette SVGs ─────────────────────────────────────────────────────

function RoomSilhouette({ roomType, palette }: { roomType: string; palette: string[] }) {
  const [c1, c2, c3, c4] = palette.length >= 4 ? palette : ["#C9A84C", "#0B1F3A", "#FAF7F0", "#8BA3C5"];

  if (roomType === "bathroom") {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <rect width="300" height="200" fill={c3} />
        <rect x="0" y="140" width="300" height="60" fill={c1} opacity="0.3" />
        <rect x="20" y="100" width="80" height="50" rx="8" fill={c2} opacity="0.6" />
        <rect x="30" y="60" width="60" height="40" rx="4" fill={c4} opacity="0.4" />
        <rect x="200" y="80" width="80" height="60" rx="10" fill={c2} opacity="0.5" />
        <circle cx="240" cy="50" r="20" fill={c4} opacity="0.3" />
        <rect x="0" y="130" width="300" height="4" fill={c1} opacity="0.5" />
      </svg>
    );
  }

  if (roomType === "kitchen") {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <rect width="300" height="200" fill={c3} />
        <rect x="0" y="100" width="300" height="100" fill={c1} opacity="0.2" />
        <rect x="0" y="120" width="300" height="20" fill={c2} opacity="0.4" />
        <rect x="10" y="60" width="120" height="60" rx="4" fill={c2} opacity="0.5" />
        <rect x="140" y="60" width="150" height="60" rx="4" fill={c2} opacity="0.5" />
        <circle cx="60" cy="88" r="12" fill={c1} opacity="0.6" />
        <circle cx="100" cy="88" r="12" fill={c1} opacity="0.6" />
        <rect x="10" y="30" width="280" height="5" fill={c1} opacity="0.3" />
      </svg>
    );
  }

  // Default living/bedroom
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <rect width="300" height="200" fill={c3} />
      <rect x="0" y="150" width="300" height="50" fill={c1} opacity="0.15" />
      <rect x="30" y="80" width="240" height="70" rx="12" fill={c2} opacity="0.3" />
      <rect x="50" y="95" width="80" height="55" rx="8" fill={c4} opacity="0.5" />
      <rect x="170" y="95" width="80" height="55" rx="8" fill={c4} opacity="0.5" />
      <rect x="100" y="40" width="100" height="60" rx="6" fill={c2} opacity="0.4" />
      <rect x="0" y="145" width="300" height="3" fill={c1} opacity="0.4" />
      <rect x="250" y="80" width="40" height="65" rx="4" fill={c2} opacity="0.5" />
    </svg>
  );
}

// ─── Design Board ─────────────────────────────────────────────────────────────

function DesignBoard({
  design,
  originalPhoto,
}: {
  design: DesignConcept;
  originalPhoto: string;
}) {
  const [showDesign, setShowDesign] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Before / After toggle */}
      <div className="relative rounded-2xl overflow-hidden bg-navy" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="wait">
          {!showDesign ? (
            <motion.img
              key="original"
              src={originalPhoto}
              alt="Original room"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : (
            <motion.div
              key="design"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RoomSilhouette roomType={design.room_type} palette={design.colour_palette} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Labels */}
        <div className="absolute top-3 left-3">
          <span className="bg-navy/80 text-cream font-syne text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
            {showDesign ? "Design Concept" : "Current Condition"}
          </span>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setShowDesign(!showDesign)}
          className="absolute bottom-3 right-3 bg-navy/80 text-cream font-syne text-xs px-3 py-2 rounded-xl backdrop-blur-sm flex items-center gap-1.5 touch-target"
        >
          <RefreshCw size={12} />
          {showDesign ? "View Before" : "View Design"}
        </button>
      </div>

      {/* Design title */}
      <div className="card-cream p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-cormorant font-bold text-navy text-2xl leading-tight">
              {design.design_title}
            </h3>
            <p className="font-syne text-navy/60 text-sm mt-1 leading-relaxed">
              {design.design_summary}
            </p>
          </div>
          <span className={cn(
            "flex-none text-xs font-syne font-semibold px-2 py-1 rounded-lg capitalize",
            COMPLEXITY_COLOURS[design.complexity]
          )}>
            {design.complexity} complexity
          </span>
        </div>
      </div>

      {/* Colour palette */}
      <div className="card-cream p-4">
        <h4 className="font-cormorant font-semibold text-navy text-lg mb-3">Colour Palette</h4>
        <div className="flex gap-3">
          {design.colour_palette.map((hex, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-xl shadow-sm border border-black/5"
                style={{ backgroundColor: hex }}
              />
              <span className="font-mono text-navy/50 text-xs">{hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      {design.materials?.length > 0 && (
        <div className="card-cream p-4">
          <h4 className="font-cormorant font-semibold text-navy text-lg mb-3">Materials & Finishes</h4>
          <div className="grid grid-cols-2 gap-2">
            {design.materials.map((mat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 bg-navy/5 rounded-xl"
              >
                <div
                  className="w-10 h-10 rounded-lg flex-none border border-black/5"
                  style={{ backgroundColor: mat.colour }}
                />
                <div className="min-w-0">
                  <p className="font-syne text-navy text-sm font-medium leading-tight truncate">
                    {mat.name}
                  </p>
                  <p className="font-syne text-navy/40 text-xs capitalize mt-0.5">
                    {mat.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key changes */}
      <div className="card-cream p-4">
        <h4 className="font-cormorant font-semibold text-navy text-lg mb-3">Key Changes</h4>
        <div className="space-y-2">
          {design.key_changes.map((change, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold flex-none flex items-center justify-center mt-0.5">
                <span className="font-mono text-navy text-xs font-bold">{i + 1}</span>
              </div>
              <p className="font-syne text-navy text-sm pt-0.5 leading-relaxed">{change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trades */}
      {design.suggested_trades?.length > 0 && (
        <div className="card-cream p-4">
          <h4 className="font-cormorant font-semibold text-navy text-base mb-2">Suggested Trades</h4>
          <div className="flex flex-wrap gap-2">
            {design.suggested_trades.map((trade, i) => (
              <span
                key={i}
                className="bg-navy/10 text-navy font-syne text-xs px-3 py-1.5 rounded-full"
              >
                {trade}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Scope */}
      {design.estimated_scope && (
        <div className="card-cream p-4">
          <h4 className="font-cormorant font-semibold text-navy text-base mb-2">Scope of Works</h4>
          <p className="font-syne text-navy/70 text-sm italic leading-relaxed">
            {design.estimated_scope}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

export default function VisualiserPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [design, setDesign] = useState<DesignConcept | null>(null);

  const handlePhotoCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    setStep(2);
  }, []);

  const handleRetake = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setStep(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!photoFile) {
      toast.error("Please capture a room photo first");
      return;
    }
    if (!description.trim()) {
      toast.error("Please describe the transformation you'd like");
      return;
    }

    setGenerating(true);
    try {
      const imageBase64 = await fileToBase64(photoFile);
      const res = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          imageType: photoFile.type,
          description,
          style: selectedStyle,
          budget: selectedBudget,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Design generation failed");
      }

      const data = await res.json();
      setDesign(data.design);
      setStep(3);
      toast.success("Design concept generated!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleBuildQuote = () => {
    if (!design) return;
    // Store design in sessionStorage to pick up in new quote
    sessionStorage.setItem(
      "visualiser-design",
      JSON.stringify({ design, photoPreview })
    );
    router.push("/quotes/new");
    toast.success("Design loaded into New Quote");
  };

  return (
    <div className="h-full scroll-area bg-cream/20">
      <div className="p-4 space-y-4 pb-28">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all",
                step >= s
                  ? "bg-gold text-navy"
                  : "bg-navy/10 text-navy/30"
              )}>
                {s}
              </div>
              <span className={cn(
                "font-syne text-xs truncate",
                step >= s ? "text-navy" : "text-navy/30"
              )}>
                {s === 1 ? "Photo" : s === 2 ? "Describe" : "Design"}
              </span>
              {s < 3 && (
                <div className={cn(
                  "flex-1 h-0.5 rounded",
                  step > s ? "bg-gold" : "bg-navy/10"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Capture */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="card-cream">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoCapture}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-8 flex flex-col items-center gap-4 touch-target"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <Camera size={36} className="text-gold" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-cormorant font-semibold text-navy text-xl">
                      Photograph the Room
                    </h3>
                    <p className="font-syne text-navy/50 text-sm mt-1">
                      Tap to open camera or choose from library
                    </p>
                  </div>
                  <div className="bg-gold/10 rounded-xl px-4 py-2.5 flex items-center gap-2 text-gold font-syne text-sm font-medium">
                    <Camera size={16} />
                    Open Camera
                  </div>
                </button>
              </div>

              <div className="card-cream p-4 mt-4">
                <div className="flex gap-3">
                  <Info size={18} className="text-gold flex-none mt-0.5" />
                  <div>
                    <h4 className="font-syne font-semibold text-navy text-sm">Tips for best results</h4>
                    <ul className="font-syne text-navy/60 text-xs mt-1.5 space-y-1">
                      <li>• Stand in the doorway to capture the full room</li>
                      <li>• Good lighting makes a big difference</li>
                      <li>• Landscape orientation works best</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Describe */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Photo preview */}
              {photoPreview && (
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRetake}
                    className="absolute top-3 right-3 bg-navy/80 text-cream p-2 rounded-xl backdrop-blur-sm touch-target"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-navy/80 text-cream font-syne text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                    {photoFile && `${(photoFile.size / 1024 / 1024).toFixed(1)} MB`}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="card-cream p-4">
                <label className="block font-syne text-xs text-gold font-semibold mb-2">
                  Describe the transformation
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What would you like to do with this room? e.g. 'Full bathroom refurbishment — replace suite with freestanding bath, walk-in shower, heated towel rail and full wall-to-ceiling tiling in large format porcelain'"
                  rows={4}
                  className="w-full px-3 py-3 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-sm resize-none focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder-navy/30"
                />
              </div>

              {/* Style chips */}
              <div className="card-cream p-4">
                <label className="block font-syne text-xs text-gold font-semibold mb-3">
                  Design style (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {STYLE_CHIPS.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(selectedStyle === style ? null : style)}
                      className={cn(
                        "px-3 py-2 rounded-xl font-syne text-sm border-2 transition-all touch-target",
                        selectedStyle === style
                          ? "bg-gold border-gold text-navy font-semibold"
                          : "bg-transparent border-navy/20 text-navy/60"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="card-cream p-4">
                <label className="block font-syne text-xs text-gold font-semibold mb-3">
                  Budget range (optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedBudget(selectedBudget === opt.value ? null : opt.value)}
                      className={cn(
                        "py-3 rounded-xl font-syne text-sm border-2 transition-all touch-target",
                        selectedBudget === opt.value
                          ? "bg-gold/10 border-gold text-gold font-semibold"
                          : "bg-transparent border-navy/20 text-navy/60"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <GoldButton
                size="lg"
                loading={generating}
                onClick={handleGenerate}
                className="w-full"
              >
                <Palette size={18} />
                Generate Design Concept
              </GoldButton>
            </motion.div>
          )}

          {/* Step 3: Design */}
          {step === 3 && design && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {photoPreview && (
                <DesignBoard design={design} originalPhoto={photoPreview} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Build Quote CTA (step 3 only) */}
      {step === 3 && design && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] left-0 right-0 p-4 bg-navy/95 backdrop-blur-sm border-t border-gold/20"
        >
          <GoldButton size="lg" onClick={handleBuildQuote} className="w-full">
            <FileText size={18} />
            Build Quote from This Design
          </GoldButton>
        </motion.div>
      )}
    </div>
  );
}
