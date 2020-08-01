export interface IProduct {
        id: number;
        name: string;
        description: string;
        price: number;
        pictureUrl: string;
        productType: string;
        productBrand: string;
    }


export interface IProductInsertUpdate {
        id: number;
        name: string;
        description: string;
        price: number;
        pictureUrl: string;
        ProductTypeId: number;
        ProductBrandId: number;
}

    