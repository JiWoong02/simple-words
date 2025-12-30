import { useCallback, useState } from "react"

export function useToggle(initialValue = false) {
    const [value, setValue] = useState<boolean>(initialValue)

    const toggle = useCallback(() => {
        setValue(v => !v)
    }, [])

    const on = useCallback(() => {
        setValue(true)
    }, [])

    const off = useCallback(() => {
        setValue(false)
    }, [])

    return {
        value,
        toggle,
        on,
        off,
        set: setValue,
    }
}
