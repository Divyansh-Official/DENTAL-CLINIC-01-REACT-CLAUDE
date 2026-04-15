import { useEffect, useState } from "react";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

export interface FAQItem {
  q: string;
  a: string;
}

export function useFAQ() {
  const [faqs,    setFaqs]    = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    fetch(`${SCRIPT_URL}?action=faq`)
      .then(r => r.json())
      .then(data => {
        setFaqs(data.faqs || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { faqs, loading, error };
}