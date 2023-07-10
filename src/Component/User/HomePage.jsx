import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/HomePageStyle.css'
import '../../assets/Style.css'

import Header from '../../Layout/User/Header';
import ChooseSubject from './HomeComponent/ChooseSubject';
import ActivityInWeek from './HomeComponent/ActivityInWeek';
import LeadBoard from './HomeComponent/LeadBoard';
import Footer from '../../Layout/User/Footer';

import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const phoneNumber = '0328284430';
    const navigate = useNavigate();

    const handleZaloCall = () => {
        const zaloChatLink = `https://zalo.me/${phoneNumber}`;
        window.open(zaloChatLink, '_blank');
        navigate('/'); // Replace '/next-page' with the URL of your desired next page
    };

    return (
        <>
            <Header />
            <span>
                <div className='body fade-appear-active' style={{ background: '#f9f9f9'}}>
                    <div className='sc-cOajty jAnegm dashboard' style={{ marginLeft: '50px' }}>
                        <div className='sc-hKgILt gTLZXx container-fluid'>

                            {/* Chọn môn học */}
                            <ChooseSubject />

                            {/* Các hoạt động trong tuần */}
                            <ActivityInWeek />

                            {/* Bảng xếp hạng */}
                            <LeadBoard />

                        </div>
                    </div>
                </div>
            </span>
            <div className="zalo-icon-container" onClick={handleZaloCall} style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', zIndex: '9999' }}>
                    {/* <FaZalo size={24} /> */}
                    <img src="../Image/7044033_zalo_icon.png" alt="" width={60}/>
                    <div id="zalo-chat-widget" />
                </div>
            <Footer />

        </>
    )
}