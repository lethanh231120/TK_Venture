import React from 'react'
import footer from '../../styles/footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={footer.footer}>
      <div className={footer.title}>
          <div className={footer.logo_image}>
              <Image src={'/images/logo_color.png'} alt='logo' width={25} height={25} className={footer.logo_image_url}/>
          </div>
          <div className={footer.logo_text}>
              CHAINPLAY
          </div>
      </div>
      <div className={footer.category}>
        <div className={footer.category_item}>FAQ</div>
        <div className={footer.category_item}>Newsletter</div>
        <div className={footer.category_item}>Advertise</div>
        <div className={footer.category_item}>Contact Us</div>
        <div className={footer.category_item}>Press Kit</div>
        <div className={footer.category_item}>Privacy</div>
        <div className={footer.category_item}>Terms</div>
      </div>
      <div className={footer.copyright}>2021 PlayToEarn.net - All Rights Reserved</div>
    </div>
  )
}

export default Footer
