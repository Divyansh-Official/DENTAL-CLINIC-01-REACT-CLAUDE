import { useEffect, useState } from "react";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

export interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  alt: string;
  category: string;
  tag: string;
  span: boolean;
  src: string;
}

export function useGallery() {
  const [images,  setImages]  = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    fetch(`${SCRIPT_URL}?action=gallery`)
      .then(r => r.json())
      .then(data => {
        setImages(data.gallery || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { images, loading, error };
}