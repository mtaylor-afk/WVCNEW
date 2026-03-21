"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteData } from "@/lib/data";

type FormState = "idle" | "loading" | "success";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  postcode: string;
  description: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "",
  postcode: "",
  description: "",
};

export default function QuoteForm() {
  const { quote, company } = siteData;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
  };

  const contactItems = [
    { icon: Phone, text: company.phone, label: "Phone number" },
    { icon: Mail, text: company.email, label: "Email address" },
    { icon: MapPin, text: company.location, label: "Location" },
    { icon: Clock, text: company.hours, label: "Opening hours" },
  ];

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#1D1D1F",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="quote-grid"
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ color: "#FFFFFF" }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#B8975A",
              marginBottom: "16px",
            }}
          >
            {quote.label}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(36px, 4.5vw, 64px)",
              lineHeight: 1.1,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              whiteSpace: "pre-line",
            }}
          >
            {quote.heading}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "19px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "56px",
            }}
          >
            {quote.body}
          </p>

          {/* Contact details */}
          <div>
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  {i > 0 && (
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        margin: "20px 0",
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <Icon
                      size={18}
                      color="#B8975A"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              padding: "48px",
              minHeight: "520px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Name row */}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}
                  >
                    <FloatingField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <FloatingField
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone + Email row */}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}
                  >
                    <FloatingField
                      id="phone"
                      name="phone"
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <FloatingField
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Service select */}
                  <div style={{ marginBottom: "32px" }}>
                    <FloatingSelect
                      id="service"
                      name="service"
                      label="Service Required"
                      value={formData.service}
                      onChange={handleChange}
                      options={quote.services}
                      required
                    />
                  </div>

                  {/* Postcode */}
                  <div style={{ marginBottom: "32px" }}>
                    <FloatingField
                      id="postcode"
                      name="postcode"
                      label="Postcode"
                      type="text"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: "40px" }}>
                    <FloatingTextarea
                      id="description"
                      name="description"
                      label="Project Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit button */}
                  <SubmitButton loading={formState === "loading"}>
                    {quote.button}
                  </SubmitButton>
                </motion.form>
              ) : (
                <SuccessState heading={quote.success.heading} body={quote.success.body} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 480px) {
          .quote-grid > div:last-child > div {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===== Sub-components ===== */

function FloatingField({
  id,
  name,
  label,
  type,
  value,
  onChange,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}) {
  return (
    <div className="mkt-field" style={{ position: "relative" }}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        aria-label={label}
        autoComplete={name}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function FloatingSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  required?: boolean;
}) {
  return (
    <div
      className="mkt-field"
      style={{ position: "relative" }}
    >
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={label}
        style={{ color: value ? "#1D1D1F" : "transparent" }}
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        style={{
          top: value ? "2px" : "20px",
          fontSize: value ? "11px" : "16px",
          color: value ? "#B8975A" : "#6E6E73",
          letterSpacing: value ? "0.05em" : "normal",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div className="mkt-field" style={{ position: "relative" }}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={5}
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={loading ? {} : { backgroundColor: "#B8975A" }}
      style={{
        width: "100%",
        height: "56px",
        backgroundColor: "#1D1D1F",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "980px",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: loading ? "wait" : "pointer",
        transition: "background-color 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Sending...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path
        d="M9 2a7 7 0 0 1 7 7"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessState({ heading, body }: { heading: string; body: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        textAlign: "center",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Animated checkmark SVG */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="40" cy="40" r="36" stroke="#B8975A" strokeWidth="2" opacity="0.2" />
        <circle cx="40" cy="40" r="28" fill="#F5F5F7" />
        <motion.path
          d="M26 40 L36 50 L54 30"
          stroke="#B8975A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />
      </svg>

      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "40px",
          color: "#1D1D1F",
          lineHeight: 1.1,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "17px",
          color: "#6E6E73",
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}
