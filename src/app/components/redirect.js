import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const Redirect = (props) => {
    let { url } = props
    let router = useRouter()

    let doRedirect = (url) => {
        router.push(url)
    }

    useEffect(() => {
        doRedirect(url)
    }, [])

    return <span>Redirecting......</span>
}