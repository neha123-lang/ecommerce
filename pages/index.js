import React from 'react'
import {Product ,FooterBanner,HeroBanner} from '../components'
import {client} from '../lib/client';
const Home = ({products,bannerData}) => {
  return (
    <div>
  <HeroBanner heroBanner ={bannerData.length && bannerData[0]}/>
    <div className='products-heading'>
      <h2>best selling products</h2>
      <p>Speakers of many variations</p>
      <h2>2:55</h2>
      </div> 
      <div className='products-container'>
       {products?.map((product,index)=>{return < Product key={product.id} product={product}/>} )}
      </div>
      <FooterBanner  footerBanner={bannerData && bannerData[0]}/>
      </div>
  );
 
}
export const getServerSideProps = async ( )=>{
  const query='*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery='*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return{
    props:{products,bannerData}
  }
}
export default Home;