// falback view for loadable and network error state
function NetworkErrorFallback({ state, data, children }) {
  if (state === "hasError") return <div>Something went wrong</div>;

  if (state === "loading") return <div>Loading</div>;

  if (!data || data?.length == 0) return <></>;

  return children;
}

export default NetworkErrorFallback;
