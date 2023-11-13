export type Plan = {
    id:              number;
    productId:       null | string;
    variants:        string[];
    typeSubcription: string;
    name:            string;
    description:     string;
    priceMonthly:    number;
    priceYearly:     number;
    hrefMonthly:     null | string;
    hrefYearly:      null | string;
    features:        any[];
    mostPopular:     boolean;
    isActive:        boolean;
    createdAt:       Date;
    updatedAt:       Date;
}