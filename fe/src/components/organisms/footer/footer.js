import '../footer/footer.css';
import '../../../style/all.style.css'
import myImage from './thanh-toan.webp';
import image from './vn.jpg';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (<footer className='footer'>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-3'>
          <div className='footer-1'>
            <h5 className='footer-1-logo'>ONLINE SHOP</h5>
            <ul>
              <li>Address: Da Nang</li>
              <li>Phone: 0901-001-001</li>
              <li>Email: onlineshop@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='col-lg-3'>
          <h5 className='footer-1-logo'>CUSTOMER SUPPORT</h5>
          <ul className='support'>
            <li> <Link to="">Payment methods</Link></li>
            <li> <Link to="">Delivery policy</Link></li>
            <li> <Link to="">Return policy</Link></li>
          </ul>
        </div>
        <div className='col-lg-3'>
          <h5 className='footer-1-logo'>SHIPPING PARTNERS</h5>
          <div className="payment">
            <img src={image} alt="vn" /></div>
        </div>
        <div className='col-lg-3'>
          <h5 className='footer-1-logo'>PAYMENT SUPPORT</h5>
          <div className="payment">
            <img src={myImage} alt="thanh-toan" /></div>
        </div>
      </div>
      <div style={{ fontStyle: 'italic', fontSize: 'smaller', display: 'inline-block', border: '1px solid black', padding: '5px', borderRadius: '5px', marginLeft: "440px", color: '#ff69b4' }}>
        A different style of Grocery Store !
      </div>
    </div>
  </footer>
  )
}

export default FooterComponent;