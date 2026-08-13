export interface Product {
    id: number;
    title: string;
    category: string;
    condition: string;
    price: number;
    seller: string;
    location: string;
    image: string;
    createdAt: string;
    description: string;

    estimatedValue?: number;
    dateAdded?: string;
}