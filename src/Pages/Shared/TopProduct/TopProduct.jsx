
import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';
import useProduct from '../../../Hooks/useProduct';
import TopProductItem from '../TopProductItem/TopProductItem';



const TopProduct = () => {
    const [product] = useProduct();
    const popular = product.filter(product => product.category === 'famous' );
    return (
        <div className='mt-40'> 
            <div>
                <SectionTitle
                subHeading={"Top Selling Product"}
                heading={"Our Suggested Product"}></SectionTitle>
            </div>
            <div className='container grid md:grid-cols-3 m-auto mt-10'>
                {
                    popular.map(product => <TopProductItem key={product._id} product={product}></TopProductItem>)
                }
            </div>
            
        </div>
    );
};

export default TopProduct;