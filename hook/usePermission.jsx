import { useSelector } from "react-redux"


function usePermission() {
  const [publickey, zblogId] = useSelector((state) => {
    const permission = state.initial.data.permission
    return [permission.publickey, permission.zblogId]
  })

  return { publickey, zblogId }
}

export default usePermission