"use client"
import { useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { useForkRef } from "@mui/material"

export const Redirect = (props) => {
    let {url} = props
    let router = useRouter()
    console.log(url)

    let doRedirect = (url) => {
        console.log(url)
        router.push(url)
    }

    useEffect(() => {
        doRedirect(url)
    }, [])

    return <span>Redirecting......</span>
}

// export default Redirect