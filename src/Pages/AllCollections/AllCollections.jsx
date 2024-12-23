import React, { useState, useRef, useEffect } from "react";
import useProduct from "../../Hooks/useProduct";
import Allitem from "./AllItem/Allitem";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllCollections = () => {
    const [product] = useProduct();
    const men = product.filter(product => product.gender === 'Men');
    const women = product.filter(product => product.gender === 'Women');
    const axiosPublic = useAxiosPublic();
    const [activeTab, setActiveTab] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef([]);
    const [itemPerPages, setItemPerPages] = useState(10);
    const dataLength = product?.length;

    // Pagination
    const numberOfPages = Math.ceil(dataLength / itemPerPages);
    const [currentPages, setCurrentPages] = useState(0);
    const pages = [...Array(numberOfPages).keys()];
    const [paginatedProduct, setPaginatedProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Sorting state
    const [sortOrder, setSortOrder] = useState("lowToHigh"); // Default sort: low to high

    // Load products for pagination
    useEffect(() => {
        setLoading(true);
        if (activeTab === 0) {
            axiosPublic
                .get(`/product?page=${currentPages}&size=${itemPerPages}`)
                .then(res => {
                    setPaginatedProduct(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching paginated products:", error);
                    setLoading(false);
                });
        } 
    }, [currentPages, activeTab, itemPerPages, axiosPublic]);

    // Filtered products based on search query
    const filteredProducts = paginatedProduct.filter((productItem) =>
        productItem.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productItem.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered products by price
    const sortedProducts = sortOrder === "default" ? filteredProducts : [...filteredProducts].sort((a, b) => {
        if (sortOrder === "lowToHigh") {
            return a.price - b.price; // Ascending price order
        } else {
            return b.price - a.price; // Descending price order
        }
    });

    // Tab content
    const allProductsContent = (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((productItem) => (
                <Allitem key={productItem._id || productItem.id} product={productItem} />
            ))}
        </div>
    );

    const mensCollections = (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {men.map(product => (
                <Allitem key={product._id} product={product} />
            ))}
        </div>
    );

    const woMensCollections = (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {women.map(product => (
                <Allitem key={product._id} product={product} />
            ))}
        </div>
    );

    const tabs = [
        { label: "All Products", content: allProductsContent },
        { label: "Mens Collections", content: mensCollections },
        { label: "Women Collections", content: woMensCollections },
      
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

    const handlePreviewPage = () => {
        if (currentPages > 0) {
            setCurrentPages(currentPages - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPages < pages.length - 1) {
            setCurrentPages(currentPages + 1);
        }
    };

    return (
        <div className="bg-black">
            <Helmet>
                <title>All Collections || Dazzling</title>
            </Helmet>

            <div className="bg-black">
                <div className="w-full mx-auto m-auto bg-gradient-to-br from-sky-950 via-black to-indigo-950  shadow-2xl lg:p-10">
                    {/* Search Input */}
                    <div className="flex justify-center mb-8">
                        <input
                            type="text"
                            placeholder="Search by gender, brand, or name"
                            className="w-80 md:w-1/2 lg:w-1/3 p-2  border border-yellow-600 rounded-md text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex justify-end mb-8 max-sm:justify-center">
                        <select
                            className="w-48 p-2 border border-yellow-600 rounded-md text-white"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Default</option> 
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="relative mb-8">
                        <div className="container flex space-x-1 justify-center max-sm:flex-col ">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    ref={(el) => (tabsRef.current[index] = el)}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${tab.label === "Luxurious Product" ? "text-yellow-400" : activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
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
                    <div className="bg-gradient-to-br from-black via-sky-950 to-black  p-6 rounded-lg shadow-inner lg:w-full">
                        {tabs.map((tab, index) => (
                            <TabPanel key={index} index={index}>
                                {tab.content}
                            </TabPanel>
                        ))}
                        <div className="m-auto items-center text-center mt-10 mb-5">
                            <h3 className="text-2xl font-bold text-lightning text-yellow-600">Dazzling</h3>
                            <p className="p-2 text-white">Current Page : {currentPages + 1}</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button onClick={handlePreviewPage} className="p-2">
                                <GrPrevious size={25} color="orange" />
                            </button>
                            {pages.map((page) => (
                                <button
                                    onClick={() => setCurrentPages(page)}
                                    className="hover:bg-yellow-500 font-bold bg-black rounded-md py-1 px-3 border-s-2 border-b-2 border-yellow-600"
                                    key={page}
                                >
                                    {page + 1}
                                </button>
                            ))}
                            <button onClick={handleNextPage} className="p-2">
                                <GrNext size={25} color="orange" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCollections;
