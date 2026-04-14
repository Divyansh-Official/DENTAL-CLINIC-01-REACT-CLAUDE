import { useState, useEffect } from "react";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: boolean;
}

let cache: BlogPost[] | null = null;
let fetchPromise: Promise<BlogPost[]> | null = null;

function fetchPosts(): Promise<BlogPost[]> {
  if (cache) return Promise.resolve(cache);
  if (fetchPromise) return fetchPromise;

  if (!SCRIPT_URL) {
    console.error("VITE_SCRIPT_URL is not set");
    return Promise.reject(new Error("Missing SCRIPT_URL"));
  }

  fetchPromise = fetch(`${SCRIPT_URL}?action=blog`)
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
      cache = data.posts || [];
      fetchPromise = null;
      return cache as BlogPost[];
    })
    .catch(err => {
      fetchPromise = null; // allow retry
      throw err;
    });

  return fetchPromise;
}

export function useBlog(): UseBlogReturn {
  const [posts, setPosts]     = useState<BlogPost[]>(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (cache) {
      setPosts(cache);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    fetchPosts()
      .then(p => setPosts(p))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}