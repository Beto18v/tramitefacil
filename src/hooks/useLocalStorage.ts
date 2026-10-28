import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';

export interface UseLocalStorageOptions<T> {
  debounceMs?: number;
  onError?: (error: unknown) => void;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export interface UseLocalStorageControls {
  reset: () => void;
  flush: () => void;
}

/**
 * Hook reutilizable para sincronizar estado con localStorage.
 * Incluye tipado genérico, debounce (300-400ms) para evitar bloqueos del hilo principal,
 * manejo seguro de QuotaExceededError, reset a valor inicial y forzado de guardado inmediato (flush).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, UseLocalStorageControls] {
  const {
    debounceMs = 350,
    onError,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  // Resolve initial value
  const getInitialValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return deserializer(item);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        console.warn(`[useLocalStorage] Error al leer la clave "${key}":`, error);
      }
    }

    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  }, [key, initialValue, deserializer, onError]);

  const [storedValue, setStoredValue] = useState<T>(getInitialValue);
  const valueRef = useRef<T>(storedValue);
  valueRef.current = storedValue;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Safe write implementation
  const persistToStorage = useCallback(
    (valueToPersist: T) => {
      if (typeof window === 'undefined') return;

      try {
        const serialized = serializer(valueToPersist);
        window.localStorage.setItem(key, serialized);
      } catch (error: unknown) {
        const isQuotaExceeded =
          error instanceof DOMException &&
          (error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.code === 22 ||
            error.code === 1014);

        if (isQuotaExceeded) {
          console.warn(
            `[useLocalStorage] Cuota de almacenamiento excedida (QuotaExceededError) para "${key}". Los cambios no pudieron persistirse.`
          );
        } else {
          console.error(`[useLocalStorage] Error al guardar en localStorage para "${key}":`, error);
        }

        if (onError) {
          onError(error);
        }
      }
    },
    [key, serializer, onError]
  );

  // Debounced write
  const scheduleSave = useCallback(
    (newValue: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        persistToStorage(newValue);
        timeoutRef.current = null;
      }, debounceMs);
    },
    [debounceMs, persistToStorage]
  );

  // Set state wrapper
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (valueOrFn) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof valueOrFn === 'function'
            ? (valueOrFn as (prevState: T) => T)(prev)
            : valueOrFn;
        valueRef.current = nextValue;
        scheduleSave(nextValue);
        return nextValue;
      });
    },
    [scheduleSave]
  );

  // Flush: force immediate write to localStorage
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    persistToStorage(valueRef.current);
  }, [persistToStorage]);

  // Reset: restore initial value and flush immediately
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const resolvedInitial =
      typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    setStoredValue(resolvedInitial);
    valueRef.current = resolvedInitial;
    persistToStorage(resolvedInitial);
  }, [initialValue, persistToStorage]);

  // Cleanup pending timeout on unmount and persist pending changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        persistToStorage(valueRef.current);
      }
    };
  }, [persistToStorage]);

  return [storedValue, setValue, { reset, flush }];
}

