import { useEffect } from "react";
import { navigate } from "vike/client/router"

export const Page = () => {
  useEffect(() =>{
    navigate('/app/clicktracks')
  }, [])

  return <></>;
};
