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