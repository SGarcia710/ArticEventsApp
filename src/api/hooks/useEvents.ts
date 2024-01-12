import useSWR from 'swr';

export default () => {
  const {data, error, isLoading} = useSWR<Events>('events?limit=4');

  return {
    events: data,
    isLoading,
    error,
  };
};
