import React from "react";

export default function useFetch(fetchFn) {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState();
  const [count, setCounter] = React.useState();
  const trigger = () => setCounter((prevCount) => prevCount +1 );
  React.useEffect(() => {
    (async () => {
        setIsLoading(true)
        try {
          const response =  await (fetchFn && fetchFn());
          setData(response);
        } catch (error) {
            setError(error);
            setIsError(true);
            console.log (error);
            
        } finally{
            setIsLoading(false);
        }
    })();
  }, [count])
  return { data, isLoading, isError, error,trigger };
}
