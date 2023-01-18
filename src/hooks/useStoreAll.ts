import { useEffect, useState } from "react"
import { Query, Store } from "storaje"

export function useStoreAll<T extends { id: Store.Id }>(store: Store<T>, query?: Query<T>): T[] {
    const [objects, setObjects] = useState<T[]>([])
    
    useEffect(() => {
        const observer = store.observeAll(query)

        setObjects(observer.value)

        observer.bind(setObjects)

        return () => observer.destroy()
    }, [store, query])

    return objects
}