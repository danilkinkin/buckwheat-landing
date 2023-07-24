function useIsServer() {
  return typeof window === 'undefined';
}

export default useIsServer;
