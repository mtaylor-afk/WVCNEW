"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, RefreshCw, Save, AlertTriangle, GripVertical, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingInput";
import { GoldButton } from "@/components/ui/GoldButton";
import { SkeletonLineItem } from "@/components/ui/SkeletonCard";
import {
  generateQuoteRef,
  formatCurrency,
  formatAmount,
  parseAmount,
  cn,
} from "@/lib/utils";
import type { LineItem, Quote } from "@/lib/types";
import { saveQuote } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/lib/types";

// ─── Sortable Line Item Card ──────────────────────────────────────────────────

function SortableLineItem({
  item,
  index,
  onChange,
  onDelete,
}: {
  item: LineItem;
  index: number;
  onChange: (id: string, field: keyof LineItem, value: string | number) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const [showNotes, setShowNotes] = useState(!!item.notes);
  const [amountStr, setAmountStr] = useState(formatAmount(item.amount));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.85 : 1,
  };

  const handleAmountBlur = () => {
    const parsed = parseAmount(amountStr);
    onChange(item.id, "amount", parsed);
    setAmountStr(formatAmount(parsed));
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      className={cn(
        "bg-white rounded-xl border border-navy/10 overflow-hidden shadow-sm",
        isDragging && "shadow-card-hover"
      )}
    >
      <div className="flex items-start gap-2 p-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder item ${index + 1}`}
          className="mt-1 p-1 touch-target text-navy/30 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={18} aria-hidden="true" />
        </button>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Item number + description */}
          <div className="flex items-start gap-2">
            <span className="font-mono text-xs text-gold mt-2 whitespace-nowrap">
              {String(index + 1).padStart(2, "0")}
            </span>
            <input
              value={item.description}
              onChange={(e) => onChange(item.id, "description", e.target.value)}
              placeholder="Description..."
              aria-label={`Item ${index + 1} description`}
              className="flex-1 bg-transparent border-b border-navy/20 focus:border-gold pb-1 text-navy font-syne text-sm focus:outline-none placeholder-navy/30"
            />
          </div>

          {/* Notes (toggleable) */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <textarea
                  value={item.notes || ""}
                  onChange={(e) => onChange(item.id, "notes", e.target.value)}
                  placeholder="Notes (materials, spec, methodology)..."
                  rows={2}
                  className="w-full bg-navy/5 rounded-lg px-3 py-2 text-navy/70 font-syne text-xs resize-none focus:outline-none focus:ring-1 focus:ring-gold/30 placeholder-navy/30"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom row: notes toggle + amount */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowNotes(!showNotes)}
              aria-expanded={showNotes}
              aria-label={showNotes ? `Hide notes for item ${index + 1}` : `Add notes for item ${index + 1}`}
              className="text-xs text-gold/70 font-syne flex items-center gap-1"
            >
              {showNotes ? <ChevronUp size={12} aria-hidden="true" /> : <ChevronDown size={12} aria-hidden="true" />}
              {showNotes ? "Hide notes" : "Add notes"}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-navy/50 font-syne text-sm">£</span>
              <input
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                onBlur={handleAmountBlur}
                aria-label={`Amount for item ${index + 1} in pounds`}
                className="w-24 text-right bg-transparent border-b border-navy/20 focus:border-gold pb-1 text-navy font-mono text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(item.id)}
          aria-label={`Delete item ${index + 1}`}
          className="mt-1 p-1 touch-target text-red-400 hover:text-red-600"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewQuotePage() {
  const today = new Date().toISOString().slice(0, 10);

  // Client details
  const [clientName, setClientName] = useState("");
  const [clientMobile, setClientMobile] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [quoteRef, setQuoteRef] = useState(generateQuoteRef);
  const [quoteDate, setQuoteDate] = useState(today);

  // Works description
  const [worksDescription, setWorksDescription] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [lineItemCount, setLineItemCount] = useState(8);

  // Pick up design from Room Visualiser
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("visualiser-design");
      if (stored) {
        const { design } = JSON.parse(stored);
        if (design?.estimated_scope) {
          setWorksDescription(design.estimated_scope);
        }
        sessionStorage.removeItem("visualiser-design");
        toast.success("Design concept loaded — add a total cost and generate your quote");
      }
    } catch {}
  }, []);

  // Generated items
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // VAT & terms
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatRate, setVatRate] = useState(20);
  const [scopeSummary, setScopeSummary] = useState("");
  const [terms, setTerms] = useState(DEFAULT_SETTINGS.defaultTerms);
  const [showTerms, setShowTerms] = useState(false);
  const [showScope, setShowScope] = useState(false);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const vatAmount = vatEnabled ? subtotal * (vatRate / 100) : 0;
  const grandTotal = subtotal + vatAmount;
  const targetTotal = parseAmount(totalCost);
  const isOffTotal = totalCost && Math.abs(subtotal - targetTotal) > 0.01;

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLineItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const handleItemChange = useCallback(
    (id: string, field: keyof LineItem, value: string | number) => {
      setLineItems((items) =>
        items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  const handleDeleteItem = useCallback((id: string) => {
    setLineItems((items) => items.filter((item) => item.id !== id));
  }, []);

  const addBlankItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: "",
      notes: "",
      amount: 0,
    };
    setLineItems((items) => [...items, newItem]);
  };

  const handleGenerate = async () => {
    if (!worksDescription.trim()) {
      toast.error("Please describe the works first");
      return;
    }
    if (!totalCost || parseAmount(totalCost) <= 0) {
      toast.error("Please enter a valid total cost");
      return;
    }

    setGenerating(true);
    setShowPreview(false);

    try {
      const res = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: worksDescription,
          totalCost: parseAmount(totalCost),
          lineItemCount,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      const items: LineItem[] = data.lineItems.map(
        (item: Omit<LineItem, "id">, i: number) => ({
          ...item,
          id: `item-${Date.now()}-${i}`,
        })
      );

      setLineItems(items);
      setShowPreview(true);
      toast.success(`Generated ${items.length} line items`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!clientName.trim()) {
      toast.error("Please enter a client name");
      return;
    }
    if (lineItems.length === 0) {
      toast.error("Please generate or add line items first");
      return;
    }

    setSaving(true);
    try {
      const quote: Quote = {
        ref: quoteRef,
        quote_date: quoteDate,
        client_name: clientName,
        client_mobile: clientMobile,
        client_email: clientEmail,
        property_address: propertyAddress,
        scope_summary: scopeSummary,
        line_items: lineItems,
        subtotal,
        vat_enabled: vatEnabled,
        vat_rate: vatRate,
        vat_amount: vatAmount,
        grand_total: grandTotal,
        terms,
      };

      await saveQuote(quote);
      toast.success("Quote saved successfully");
    } catch {
      toast.error("Failed to save quote");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full scroll-area bg-cream/30">
      <div className="p-4 space-y-4 pb-32">
        {/* Client Details Card */}
        <CollapsibleCard title="Client Details" subtitle="Contact & property information">
          <div className="space-y-3">
            <FloatingInput
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              autoComplete="name"
            />
            <FloatingInput
              label="Mobile Number"
              type="tel"
              value={clientMobile}
              onChange={(e) => setClientMobile(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
            <FloatingInput
              label="Email Address"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
            />
            <FloatingTextarea
              label="Property Address"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              rows={2}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-syne text-gold mb-1.5">Quote Reference</label>
                <input
                  value={quoteRef}
                  onChange={(e) => setQuoteRef(e.target.value)}
                  className="w-full px-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-mono text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-syne text-gold mb-1.5">Quote Date</label>
                <input
                  type="date"
                  value={quoteDate}
                  onChange={(e) => setQuoteDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </CollapsibleCard>

        {/* Works Description Card */}
        <CollapsibleCard title="Works Description" subtitle="Describe the works and set the value">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-syne text-gold mb-1.5">Works Description</label>
              <textarea
                value={worksDescription}
                onChange={(e) => setWorksDescription(e.target.value)}
                placeholder="Describe the works in plain English — e.g. 'Strip and re-roof rear extension, replace all guttering, re-skim two bedrooms and decorate throughout'"
                rows={4}
                className="w-full px-4 py-3 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-sm resize-none focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder-navy/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-syne text-gold mb-1.5">Total Cost (£)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/50 font-syne">£</span>
                  <input
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                    placeholder="0.00"
                    inputMode="decimal"
                    className="w-full pl-7 pr-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-mono text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-syne text-gold mb-1.5">Line Items</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLineItemCount(Math.max(4, lineItemCount - 1))}
                    className="w-10 h-10 rounded-xl bg-navy/10 text-navy font-bold text-lg flex items-center justify-center touch-target"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-mono text-navy font-semibold text-lg">
                    {lineItemCount}
                  </span>
                  <button
                    onClick={() => setLineItemCount(Math.min(20, lineItemCount + 1))}
                    className="w-10 h-10 rounded-xl bg-navy/10 text-navy font-bold text-lg flex items-center justify-center touch-target"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <GoldButton
              size="lg"
              loading={generating}
              onClick={handleGenerate}
              className="w-full"
            >
              <Sparkles size={18} />
              Generate Smart Quote
            </GoldButton>
          </div>
        </CollapsibleCard>

        {/* Line Items */}
        <AnimatePresence>
          {(showPreview || lineItems.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* Running total bar */}
              <div
                className="bg-navy rounded-xl px-4 py-3 flex items-center justify-between"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Running total: ${formatCurrency(grandTotal)}${vatEnabled ? ` including VAT at ${vatRate}%` : ""}`}
              >
                <div>
                  <p className="font-syne text-cream/60 text-xs" aria-hidden="true">Running Total</p>
                  <p className="font-cormorant font-semibold text-gold text-2xl leading-none" aria-hidden="true">
                    {formatCurrency(grandTotal)}
                  </p>
                  {vatEnabled && (
                    <p className="font-syne text-cream/50 text-xs mt-0.5" aria-hidden="true">
                      incl. VAT @ {vatRate}%
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {isOffTotal && (
                    <div className="flex items-center gap-1.5 bg-red-500/20 rounded-lg px-2 py-1">
                      <AlertTriangle size={14} className="text-red-400" />
                      <span className="font-mono text-xs text-red-400">
                        Target: {formatCurrency(targetTotal)}
                      </span>
                    </div>
                  )}
                  {!isOffTotal && targetTotal > 0 && (
                    <span className="font-mono text-xs text-gold/60">
                      ✓ On target
                    </span>
                  )}
                </div>
              </div>

              {/* Line item list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-cormorant font-semibold text-navy text-lg">
                    Line Items
                  </h3>
                  <span className="font-mono text-xs text-navy/50">
                    {lineItems.length} items
                  </span>
                </div>

                {generating ? (
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonLineItem key={i} />
                    ))}
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={lineItems.map((i) => i.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <AnimatePresence>
                        {lineItems.map((item, index) => (
                          <SortableLineItem
                            key={item.id}
                            item={item}
                            index={index}
                            onChange={handleItemChange}
                            onDelete={handleDeleteItem}
                          />
                        ))}
                      </AnimatePresence>
                    </SortableContext>
                  </DndContext>
                )}

                {/* Add item button */}
                <button
                  onClick={addBlankItem}
                  className="w-full py-3 border-2 border-dashed border-navy/20 rounded-xl text-navy/50 font-syne text-sm flex items-center justify-center gap-2 touch-target hover:border-gold/40 hover:text-gold transition-colors"
                >
                  <Plus size={16} />
                  Add Line Item
                </button>
              </div>

              {/* Scope Summary */}
              <div className="card-cream">
                <button
                  onClick={() => setShowScope(!showScope)}
                  className="w-full flex items-center justify-between p-4 touch-target"
                >
                  <h3 className="font-cormorant font-semibold text-navy text-base">
                    Scope Summary (optional)
                  </h3>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-navy/40 transition-transform",
                      showScope && "rotate-180"
                    )}
                  />
                </button>
                {showScope && (
                  <div className="px-4 pb-4">
                    <textarea
                      value={scopeSummary}
                      onChange={(e) => setScopeSummary(e.target.value)}
                      placeholder="Introductory paragraph for the PDF — describes the works in professional language..."
                      rows={3}
                      className="w-full px-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-sm italic resize-none focus:outline-none focus:border-gold"
                    />
                  </div>
                )}
              </div>

              {/* VAT Toggle */}
              <div className="card-cream p-4 flex items-center justify-between">
                <div>
                  <p className="font-syne font-medium text-navy">VAT</p>
                  <p className="font-syne text-xs text-navy/50">
                    {vatEnabled ? `@ ${vatRate}% = ${formatCurrency(vatAmount)}` : "Not applied"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {vatEnabled && (
                    <input
                      type="number"
                      value={vatRate}
                      onChange={(e) => setVatRate(Number(e.target.value))}
                      min={0}
                      max={100}
                      className="w-16 px-2 py-1.5 bg-navy/5 border border-navy/20 rounded-lg text-navy font-mono text-sm text-center focus:outline-none focus:border-gold"
                    />
                  )}
                  <button
                    onClick={() => setVatEnabled(!vatEnabled)}
                    className={cn(
                      "w-12 h-7 rounded-full transition-colors relative",
                      vatEnabled ? "bg-gold" : "bg-navy/20"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all",
                        vatEnabled ? "left-6" : "left-1"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="card-cream">
                <button
                  onClick={() => setShowTerms(!showTerms)}
                  className="w-full flex items-center justify-between p-4 touch-target"
                >
                  <h3 className="font-cormorant font-semibold text-navy text-base">
                    Terms & Conditions
                  </h3>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-navy/40 transition-transform",
                      showTerms && "rotate-180"
                    )}
                  />
                </button>
                {showTerms && (
                  <div className="px-4 pb-4">
                    <textarea
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2.5 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-xs resize-none focus:outline-none focus:border-gold"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky bottom action bar */}
      {lineItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] left-0 right-0 bg-navy/95 backdrop-blur-sm border-t border-gold/20 p-4 flex gap-3"
        >
          <GoldButton
            variant="outline"
            size="md"
            onClick={handleGenerate}
            loading={generating}
            className="flex-1"
          >
            <RefreshCw size={16} />
            Regenerate
          </GoldButton>
          <GoldButton
            variant="solid"
            size="md"
            onClick={handleSave}
            loading={saving}
            className="flex-1"
          >
            <Save size={16} />
            Save Quote
          </GoldButton>
        </motion.div>
      )}
    </div>
  );
}
