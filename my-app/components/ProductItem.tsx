import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishListProps} from './AddProductToWishList' 
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";
import lodash from "lodash";

//import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return   import('./AddProductToWishList').then(mod =>mod.AddProductToWishList)
}, {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
    product: {
        id: number;
    price: number;  
    title: string;
    priceFormatted: string;
    }
    onAddToWishList: (id: number) => void;
}

 function ProductItemComponent({product,onAddToWishList}: ProductItemProps) {
     const [isAddignToWishList,setIsAddignToWishList] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <AddProductToWishList onAddToWishList={() => onAddToWishList(product.id)}
            onRequestClose={() => setIsAddignToWishList(false)}/>
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps)=> {
    return lodash.isEqual(prevProps.product, nextProps.product)
})