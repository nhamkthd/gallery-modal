import { useEffect } from "react";
import emitter from "../common/event";

export default function useEvent(event, handleData) {
  useEffect(() => {
    const token = emitter.addListener(event, handleData);
    return () => token.remove();
  }, [event, handleData]);
}
