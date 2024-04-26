import FooterComponent from "../footer/footer"
import HeaderComponent from "../header/header"

const Layout = ({children, ...props}) => {
    
    
    
    return (
        <div {...props}>
    <HeaderComponent/>
    {children}
    <FooterComponent/>
        </div>
    )
}

export default Layout;