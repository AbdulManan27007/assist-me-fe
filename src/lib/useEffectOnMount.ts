import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export function useEffectOnMount(effect: EffectCallback) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effect();
    }
  }, []);
}
