import { useState, useEffect} from "react";

function useFetch(url, options, errorCallback) {

  const [res, setRes] = useState()
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if(fetching) return
      setFetching(true)
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setRes(json)
      } catch (error) {
        errorCallback && errorCallback(error)
      } finally {
        setFetching(false)
      }
    }
    fetchData()
  }, [errorCallback, fetching, options, url])

  return {res, fetching}
}

export default useFetch
