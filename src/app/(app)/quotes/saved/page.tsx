"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Phone,
  Mail,
  FileText,
  Share2,
  Trash2,
  X,
  Download,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { loadQuotes, deleteQuote } from "@/lib/db";
import { formatCurrency, relativeTime, downloadBlob } from "@/lib/utils";
import type { Quote } from "@/lib/types";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { GoldButton } from "@/components/ui/GoldButton";

// ─── Quote Card ───────────────────────────────────────────────────────────────

function QuoteCard({
  quote,
  onDelete,
  onShare,
  onExpand,
}: {
  quote: Quote;
  onDelete: (ref: string) => void;
  onShare: (quote: Quote) => void;
  onExpand: (quote: Quote) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-cream overflow-hidden"
    >
      {/* Card body — tap to expand */}
      <button
        onClick={() => onExpand(quote)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="quote-ref">{quote.ref}</span>
            <h3 className="font-cormorant font-semibold text-navy text-xl mt-0.5 leading-tight">
              {quote.client_name || "No name"}
            </h3>
            {quote.property_address && (
              <p className="font-syne text-navy/50 text-sm mt-0.5 truncate">
                {quote.property_address}
              </p>
            )}
            <p className="font-syne text-navy/40 text-xs mt-1">
              {relativeTime(quote.created_at || new Date().toISOString())}
            </p>
          </div>
          <div className="text-right flex-none">
            <p className="font-cormorant font-bold text-gold text-2xl leading-none">
              {formatCurrency(quote.grand_total)}
            </p>
            {quote.vat_enabled && (
              <p className="font-syne text-navy/40 text-xs mt-0.5">incl. VAT</p>
            )}
            <p className="font-mono text-navy/40 text-xs mt-1">
              {quote.line_items?.length || 0} items
            </p>
          </div>
        </div>
      </button>

      {/* Action buttons */}
      <div className="px-4 pb-3 pt-0 flex items-center gap-2 border-t border-navy/10">
        {quote.client_mobile && (
          <a
            href={`tel:${quote.client_mobile}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-navy/5 text-navy/70 font-syne text-xs touch-target"
          >
            <Phone size={14} />
            Call
          </a>
        )}
        {quote.client_email && (
          <a
            href={`mailto:${quote.client_email}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-navy/5 text-navy/70 font-syne text-xs touch-target"
          >
            <Mail size={14} />
            Email
          </a>
        )}
        <button
          onClick={() => onShare(quote)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gold/10 text-gold font-syne text-xs touch-target"
        >
          <Share2 size={14} />
          Share
        </button>
        <button
          onClick={() => onDelete(quote.ref)}
          className="flex items-center justify-center p-2.5 rounded-xl bg-red-50 text-red-400 touch-target"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Share Sheet ─────────────────────────────────────────────────────────────

function ShareSheet({
  quote,
  onClose,
}: {
  quote: Quote;
  onClose: () => void;
}) {
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPdf = async () => {
    setGeneratingPdf(true);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote }),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      downloadBlob(blob, `${quote.ref}.pdf`);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleEmail = async () => {
    const subject = `Quotation ${quote.ref} — ${quote.client_name}`;
    const body = `Dear ${quote.client_name},\n\nPlease find attached your quotation from WV Construction.\n\nQuote Reference: ${quote.ref}\nTotal: ${formatCurrency(quote.grand_total)}\n\nKind regards,\nWV Construction\n07966 978824`;
    window.location.href = `mailto:${quote.client_email || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await handleDownloadPdf();
  };

  const handleWhatsApp = async () => {
    const text = `Hi ${quote.client_name}, please find your quotation from WV Construction.\n\nRef: ${quote.ref}\nTotal: ${formatCurrency(quote.grand_total)}\n\nI'll send the full PDF momentarily.`;
    window.open(`https://wa.me/${quote.client_mobile?.replace(/\D/g, "") || ""}?text=${encodeURIComponent(text)}`, "_blank");
    await handleDownloadPdf();
  };

  const handleCopyLink = () => {
    const text = `WVC Quote ${quote.ref} — ${quote.client_name} — ${formatCurrency(quote.grand_total)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Quote details copied");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full bg-cream rounded-t-3xl p-6 pb-[max(24px,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-cormorant font-bold text-navy text-2xl">Share Quote</h3>
            <p className="font-mono text-gold text-sm mt-0.5">{quote.ref}</p>
          </div>
          <button onClick={onClose} className="p-2 touch-target text-navy/40">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleEmail}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-navy/10 touch-target"
          >
            <Mail size={24} className="text-navy" />
            <span className="font-syne text-navy text-sm font-medium">Email</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-navy/10 touch-target"
          >
            <MessageCircle size={24} className="text-green-600" />
            <span className="font-syne text-navy text-sm font-medium">WhatsApp</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={generatingPdf}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-navy/10 touch-target disabled:opacity-50"
          >
            <Download size={24} className="text-gold" />
            <span className="font-syne text-navy text-sm font-medium">
              {generatingPdf ? "Generating..." : "Download PDF"}
            </span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-navy/10 touch-target"
          >
            {copied ? (
              <Check size={24} className="text-green-500" />
            ) : (
              <Copy size={24} className="text-navy/60" />
            )}
            <span className="font-syne text-navy text-sm font-medium">
              {copied ? "Copied!" : "Copy Details"}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Quote Detail Sheet ───────────────────────────────────────────────────────

function QuoteDetailSheet({
  quote,
  onClose,
  onShare,
}: {
  quote: Quote;
  onClose: () => void;
  onShare: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-navy/80 backdrop-blur-sm flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 250 }}
        className="w-full bg-cream rounded-t-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex-none flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-navy/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex-none px-5 pb-4 border-b border-navy/10 flex items-start justify-between">
          <div>
            <span className="quote-ref">{quote.ref}</span>
            <h2 className="font-cormorant font-bold text-navy text-2xl mt-0.5">
              {quote.client_name}
            </h2>
            {quote.property_address && (
              <p className="font-syne text-navy/50 text-sm">{quote.property_address}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 touch-target text-navy/40 mt-1">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scroll-area px-5 py-4 space-y-4">
          {/* Line items */}
          <div>
            <h3 className="font-cormorant font-semibold text-navy text-lg mb-2">
              Line Items
            </h3>
            <div className="space-y-2">
              {(quote.line_items || []).map((item, i) => (
                <div
                  key={item.id || i}
                  className="bg-white rounded-xl p-3 border border-navy/8 gold-border-left"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="font-syne font-medium text-navy text-sm">
                        <span className="font-mono text-gold text-xs mr-1.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.description}
                      </p>
                      {item.notes && (
                        <p className="font-syne text-navy/50 text-xs mt-1 italic">
                          {item.notes}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-navy font-semibold text-sm whitespace-nowrap">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-navy rounded-xl p-4 space-y-2">
            <div className="flex justify-between font-syne text-cream/70 text-sm">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(quote.subtotal)}</span>
            </div>
            {quote.vat_enabled && (
              <div className="flex justify-between font-syne text-cream/70 text-sm">
                <span>VAT @ {quote.vat_rate}%</span>
                <span className="font-mono">{formatCurrency(quote.vat_amount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gold/30 flex justify-between">
              <span className="font-cormorant font-semibold text-cream text-xl">Grand Total</span>
              <span className="font-cormorant font-bold text-gold text-xl">
                {formatCurrency(quote.grand_total)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-none px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 border-t border-navy/10">
          <GoldButton size="lg" onClick={onShare} className="w-full">
            <Share2 size={18} />
            Share & Download PDF
          </GoldButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Delete Confirmation Sheet ────────────────────────────────────────────────

function DeleteConfirmSheet({
  quoteRef,
  onConfirm,
  onCancel,
}: {
  quoteRef: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-end"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full bg-cream rounded-t-3xl p-6 pb-[max(24px,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-cormorant font-bold text-navy text-2xl mb-2">Delete Quote?</h3>
        <p className="font-syne text-navy/60 text-sm mb-6">
          This will permanently delete <span className="font-mono text-gold">{quoteRef}</span> and cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border-2 border-navy/20 font-syne font-semibold text-navy touch-target"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 font-syne font-semibold text-white touch-target"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SavedQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuote, setExpandedQuote] = useState<Quote | null>(null);
  const [shareQuote, setShareQuote] = useState<Quote | null>(null);
  const [deleteRef, setDeleteRef] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadQuotes();
      setQuotes(data);
    } catch {
      toast.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleDelete = async () => {
    if (!deleteRef) return;
    try {
      await deleteQuote(deleteRef);
      setQuotes((prev) => prev.filter((q) => q.ref !== deleteRef));
      toast.success("Quote deleted");
    } catch {
      toast.error("Failed to delete quote");
    } finally {
      setDeleteRef(null);
    }
  };

  const filtered = quotes.filter((q) => {
    if (!searchQuery) return true;
    const s = searchQuery.toLowerCase();
    return (
      q.ref.toLowerCase().includes(s) ||
      q.client_name?.toLowerCase().includes(s) ||
      q.property_address?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="h-full bg-cream/20 flex flex-col">
      {/* Search bar */}
      <div className="flex-none px-4 py-3 bg-navy border-b border-gold/20">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, ref or address..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-cream font-syne text-sm placeholder-cream/30 focus:outline-none focus:border-gold/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 touch-target"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Quote list */}
      <div className="flex-1 scroll-area p-4 space-y-3 pb-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} lines={3} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <FileText size={48} className="text-navy/20 mb-4" />
            <h3 className="font-cormorant font-semibold text-navy text-xl mb-2">
              {searchQuery ? "No quotes found" : "No saved quotes yet"}
            </h3>
            <p className="font-syne text-navy/40 text-sm">
              {searchQuery
                ? "Try a different search term"
                : "Generate your first quote using the New Quote tab"}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((quote) => (
              <QuoteCard
                key={quote.ref}
                quote={quote}
                onDelete={(ref) => setDeleteRef(ref)}
                onShare={(q) => setShareQuote(q)}
                onExpand={(q) => setExpandedQuote(q)}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {expandedQuote && (
          <QuoteDetailSheet
            quote={expandedQuote}
            onClose={() => setExpandedQuote(null)}
            onShare={() => {
              setShareQuote(expandedQuote);
              setExpandedQuote(null);
            }}
          />
        )}
        {shareQuote && (
          <ShareSheet quote={shareQuote} onClose={() => setShareQuote(null)} />
        )}
        {deleteRef && (
          <DeleteConfirmSheet
            quoteRef={deleteRef}
            onConfirm={handleDelete}
            onCancel={() => setDeleteRef(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
