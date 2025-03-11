'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const usePageLoading = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleStop);
    router.events?.on('routeChangeError', handleStop);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleStop);
      router.events?.off('routeChangeError', handleStop);
    };
  }, [router]);

  return loading;
};

export default usePageLoading;
