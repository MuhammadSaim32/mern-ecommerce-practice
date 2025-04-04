import {Outlet} from 'react-router-dom'
import {SellerNavbar} from "./Seller.export"

function SellerApp(){


    return (
        <>
        <SellerNavbar/>
        <Outlet/>
    </>
    )

}


export default SellerApp