import useSWR from 'swr';

export default () => {
  const {data, error, isLoading} = useSWR<Events>('events?limit=10');

  return {
    events: data,
    isLoading,
    error,
  };
};
