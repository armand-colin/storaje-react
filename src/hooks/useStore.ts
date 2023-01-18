import { useEffect, useState } from "react"
import { Query, Store } from "storaje"

export function useStore<T extends { id: Store.Id }>(store: Store<T>, queryOrId: T["id"] | Query<T>): T | null {
    const [object, setObject] = useState<T | null>(null)
    
    useEffect(() => {
        const observer = store.observe(queryOrId)

        setObject(observer.value)

        observer.bind(setObject)

        return () => observer.destroy()
    }, [store, queryOrId])

    return object
}