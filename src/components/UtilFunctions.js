import { useLocation } from "react-router-dom";


export function ShowBasedOnAccType({ mgt, staff, student }) {
    const { pathname } = useLocation()
    if (pathname.startsWith('/management'))
        return mgt
    else if (pathname.startsWith('/staff'))
        return staff
    else
        return student
}

export function ChangeTopNavTitle(/* Objects containing paths and corresponding Name*/) {
    const { pathname } = useLocation()
let name = pathname.split('/')[2]
    if (name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
    else
        return 'Dashboard'

}