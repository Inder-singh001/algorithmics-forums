"use client"
import { getToken, tokenName } from "@/dataCenter/LocalStorage";
import { Redirect } from "../components/redirect";
import { usePathname } from "next/navigation";

export default function ScreenLayout({ children }) {

    let pathname = usePathname()
    let token = getToken(tokenName.LOGIN_TOKEN)
    let components;

    // checkLogin()

    if (pathname.includes('/')) {
        if (token) {
            components = children
        }
        else {
            components = <Redirect url='/auth/login' />
        }
    }
    else if (pathname.includes('/dashboard/explore')) {
        if (token) {
            components = children
        }
        else {
            components = <Redirect url='/auth/login' />
        }
    }
    else if (pathname.includes('/profile')) {
        if (token) {
            components = children
        }
        else {
            components = <Redirect url='/auth/login' />
        }
    }
    else if (pathname.includes('/add-a-post')) {
        if (token) {
            components = children
        }
        else {
            components = <Redirect url='/auth/login' />
        }
    }
    else {
        components = children
    }

    // Check Login
    // 
    console.log(pathname)
    return (
        <>
            {components}
        </>
    )

}