import { useSelector } from "react-redux"


function useAuth(width, height) {
  const [pkey, cid, token] = useSelector(state => [state.global.auth.pkey, state.global.auth.cid, state.global.auth.token])



  return { pkey, cid, token }
}

export default useAuth