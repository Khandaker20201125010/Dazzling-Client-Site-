import React, { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet';
import useProduct from "../../Hooks/useProduct";
import Allitem from "./AllItem/Allitem";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const AllCollections = () => {
    const [product] = useProduct();
    const men = product.filter(product => product.gender === 'Men')
    const Women = product.filter(product => product.gender === 'Women')

    const [activeTab, setActiveTab] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef([]);
    const [itemPerPages, setItemPerPages] = useState(12);
    const dataLength = product?.length
    //pagination
    const numberOfPages = Math.ceil(dataLength / itemPerPages)
    const [currentPages, setCurrentPages] = useState(0);
    const pages = [...Array(numberOfPages).keys()];
    const [paginatedProduct, setPaginatedProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);

        if (activeTab === 0) {
            fetch(`http://localhost:5500/product?page=${currentPages}&size=${itemPerPages}`)
                .then(res => res.json())
                .then(data => {
                    setPaginatedProduct(data);  
                    setLoading(false);
                });
        } 

    }, [currentPages, activeTab, itemPerPages]);




    // Define the tab content separately for clarity
    const allProductsContent = (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {paginatedProduct.map((productItem) => (
                <Allitem key={productItem.id} product={productItem} />
            ))}
        </div>
    );
    const mensCollections = (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {
                    men.map(product => <Allitem key={product._id} product={product}></Allitem >)
                }
            </div>
        </>
    );
    const woMensCollections = (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {
                    Women.map(product => <Allitem key={product._id} product={product}></Allitem >)
                }
            </div>
        </>
    );

    const tabs = [
        { label: "All Products", content: allProductsContent },
        { label: "Mens Collections", content: mensCollections },
        { label: "Women Collections", content: woMensCollections },
        { label: "luxurious Product", content: <h2>Need help? Check our FAQs or contact support.</h2> },
    ];

    useEffect(() => {
        const setIndicator = () => {
            const activeTabElement = tabsRef.current[activeTab];
            if (activeTabElement) {
                setIndicatorStyle({
                    left: `${activeTabElement.offsetLeft}px`,
                    width: `${activeTabElement.offsetWidth}px`,
                });
            }
        };

        setIndicator();
        window.addEventListener("resize", setIndicator);
        return () => window.removeEventListener("resize", setIndicator);
    }, [activeTab]);

    const TabPanel = ({ children, index }) => {
        return (
            <div className={`tab-panel transition-opacity duration-300 ease-in-out ${activeTab === index ? "block" : "hidden"}`}>
                {children}
            </div>
        );
    };
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    const handelPreviewPage = () => {
        if (currentPages > 0) {
            setCurrentPages(currentPages - 1);
        }
    }

    const handelNextPage = () => {
        if (currentPages < pages?.length - 1) {
            setCurrentPages(currentPages + 1);
        }
    }


    return (
        <div className="bg-black">
            <Helmet>
                <title>All Collections</title>
            </Helmet>
            <div className="bg-black">
                <div className="w-full mx-auto m-auto  bg-gradient-to-br from-black to-indigo-950 rounded-xl shadow-2xl p-10">
                    <div className="relative mb-8 ">
                        <div className="flex space-x-1 justify-center  ">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    ref={(el) => (tabsRef.current[index] = el)}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${tab.label === "luxurious Product"
                                        ? "text-yellow-400" // Always make "luxurious Product" yellow
                                        : activeTab === index
                                            ? "text-white"      // Active tab color for others
                                            : "text-gray-400 hover:text-gray-200" // Inactive tab color
                                        }`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div
                            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 transition-all duration-300 ease-in-out"
                            style={indicatorStyle}
                        />
                    </div>

                    {/* Tab Panels */}
                    <div className="bg-sky-950 p-6 rounded-lg shadow-inner">
                        {tabs.map((tab, index) => (
                            <TabPanel key={index} index={index}>
                                {tab.content}
                            </TabPanel>
                        ))}
                        <div className="m-auto items-center text-center mt-10 mb-5">
                            <h3 className="text-2xl font-bold text-lightning text-yellow-600">Dazzling</h3>
                            <p className="p-2 text-white">Current Page : {currentPages + 1}</p>
                        </div>
                        <div className="flex justify-center  gap-2">
                            <button onClick={handelPreviewPage} className="p-2"><GrPrevious size={25} color="orange" /></button>
                            {
                                pages.map(page => <button onClick={() => setCurrentPages(page)} className="hover:bg-yellow-500 font-bold bg-black  rounded-md py-1 px-3 border-s-2 border-b-2 border-yellow-600" key={pages}>{page + 1}</button>)
                            }
                            <button onClick={handelNextPage} className=" p-2">
                                <GrNext size={25} color="orange" /></button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AllCollections;
