import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  deserialize?: (raw: unknown) => T,
): [T, (value: T | ((previous: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return initialValue
      }
      const parsed: unknown = JSON.parse(item)
      return deserialize ? deserialize(parsed) : (parsed as T)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      if (storedValue === null || storedValue === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch {
      // Ignora erro caso o storage esteja bloqueado ou sem espaço
    }
  }, [key, storedValue])

  const setValue = useCallback((value: T | ((previous: T) => T)) => {
    setStoredValue((previous) =>
      typeof value === 'function'
        ? (value as (prev: T) => T)(previous)
        : value,
    )
  }, [])

  return [storedValue, setValue]
}
