import { useState, useEffect } from "react";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "";

export interface Testimonial {
  name: string;
  location: string;
  date: string;
  service: string;
  rating: number;
  text: string;
  initials: string;
}

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: boolean;
}

let cache: Testimonial[] | null = null;
let fetchPromise: Promise<Testimonial[]> | null = null;

function fetchTestimonials(): Promise<Testimonial[]> {
  if (cache) return Promise.resolve(cache);
  if (fetchPromise) return fetchPromise;

  if (!SCRIPT_URL) {
    console.error("VITE_SCRIPT_URL is not set");
    return Promise.reject(new Error("Missing SCRIPT_URL"));
  }

  fetchPromise = fetch(`${SCRIPT_URL}?action=testimonials`)
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
      // Coerce rating to a number in case Sheets returns it as a string
      cache = (data.testimonials || []).map((t: Record<string, string>) => ({
        ...t,
        rating: Number(t.rating) || 5,
      }));
      fetchPromise = null;
      return cache as Testimonial[];
    })
    .catch(err => {
      fetchPromise = null; // allow retry on next mount
      throw err;
    });

  return fetchPromise;
}

export function useTestimonials(): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(cache || []);
  const [loading, setLoading]           = useState(!cache);
  const [error, setError]               = useState(false);

  useEffect(() => {
    if (cache) {
      setTestimonials(cache);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    fetchTestimonials()
      .then(t => setTestimonials(t))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading, error };
}