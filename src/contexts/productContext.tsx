import { createContext, useEffect, useState } from "react";
// import { ProductData, TProductData } from "../mockup/ProductData";

export type TProduct = {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCount: number;
    totalPrice: number;
}

export type TProductContext = {
    proData: TProduct[];
    total: number;
    setPrices: (id: string, price: number) => void;
    isAction: boolean;
    setAction: () => void;
};


const initialValue: TProductContext = {
    proData: [],
    setPrices: (id: string, price:number) => {},
    setAction: () => {},
    total: 0,
    isAction: true,
};

export const ProductContext = createContext(initialValue);
export const ProductProvider: React.FunctionComponent = ({children}) => {
     
    const [proData, _setProData] = useState<TProduct[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isAction,setIsAction] = useState<boolean>(true);
    const setAction = () => setIsAction(!isAction);
    const setPrices = (id: string, price: number) => {
        let filtered: TProduct[] = proData.filter((product) => product.productId === id );
        proData[proData.indexOf(filtered[0])].totalPrice = price;
        _setProData(proData);
    };

    useEffect(()=>{
      
    },[]);
    
    useEffect(()=>{
        let sum = 0;
        proData.map((product) => {
            sum += product.totalPrice;
        })
        setTotal(sum);
    },[isAction]);

    return (
        <ProductContext.Provider 
            value={{
                proData,
                setPrices,
                total,
                isAction,
                setAction,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};