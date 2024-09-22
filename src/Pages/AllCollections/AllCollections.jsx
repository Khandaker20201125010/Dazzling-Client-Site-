import React, { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet';
import useProduct from "../../Hooks/useProduct";
import ProductItem from "../Shared/ProductItem/ProductItem";
import Allitem from "./AllItem/Allitem";

const AllCollections = () => {
    const [product] = useProduct();
    const men = product.filter(product => product.gender === 'Men' )
    const Women = product.filter(product => product.gender === 'Women' )
    
    const [activeTab, setActiveTab] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef([]);

    // Define the tab content separately for clarity
    const allProductsContent = (
        <>
            <div className="grid md:grid-cols-4 gap-8 ">
                {product.map((productItem) => (
                    <Allitem key={productItem.id} product={productItem} />
                ))}
            </div>
        </>
    );
    const mensCollections = (
        <>
            <div className="grid md:grid-cols-4 gap-8 ">
            {
                    men.map(product => <Allitem  key={product._id} product={product}></Allitem >)
                }
            </div>
        </>
    );
    const woMensCollections = (
        <>
            <div className="grid md:grid-cols-4 gap-8 ">
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

    return (
        <div>
            <Helmet>
                <title>All Collections</title>
            </Helmet>
            <div>
                <div className="w-full mx-auto m-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl">
                    <div className="relative mb-8 ">
                        <div className="flex space-x-1 justify-center ">
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
                    <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
                        {tabs.map((tab, index) => (
                            <TabPanel key={index} index={index}>
                                {tab.content}
                            </TabPanel>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCollections;
