export const isBrowser = () => {
  return (
    typeof document !== 'undefined' &&
    document.body &&
    typeof window !== 'undefined'
  );
};
