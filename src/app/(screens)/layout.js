"use client"
import { getToken, tokenName } from "@/dataCenter/LocalStorage";
import { checkLogin } from '@/helpers/General'
import { Redirect } from "../components/redirect";
import {  redirect, usePathname } from "next/navigation";

export default function ScreenLayout({ children }) {

    // let pathname = usePathname()
    // let token = getToken(tokenName.LOGIN_TOKEN)
    let components = children;      

    // if (pathname.includes('/')) {
    //     if (token) {               
    //         components = children
    //     }
    //     else {
    //         components = <Redirect url= '/auth/login' />
    //     }
    // }
    // else if (pathname.includes('/dashboard/explore')) {
    //     if (!token) {
    //         components = <Redirect url='/auth/login' />
    //     }
    //     else {
    //         components = children
    //     }
    // }
    // else if (pathname.includes('/profile')) {
    //     if (!token) {
    //         components = <Redirect url='/auth/login' />
    //     }
    //     else {
    //         components = children
    //     }
    // }
    // else if (pathname.includes('/add-a-post')) {
    //     if (!token) {
    //         components = <Redirect url='/auth/login' />
    //     }
    //     else {
    //         components = children
    //     }
    // }
    // else {
    //     components = children
    // }

    return (
        <>
            {components}
        </>
    )

}