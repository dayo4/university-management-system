export function ShowBasedOnAccType({ mgt, staff, student }) {
    if (pathname.startsWith('/management'))
        return mgt
    else if (pathname.startsWith('/staff'))
        return staff
    else
        return student
}