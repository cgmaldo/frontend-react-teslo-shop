interface Props {
    price: string | undefined;
}

export const priceSelectValues = ({ price }: Props) => {
    let minPrice = undefined;
    let maxPrice = undefined;
    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break;
        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break;
        case '100-200':
            minPrice = 100;
            maxPrice = 200;
            break;
        case '+200':
            minPrice = 200;
            maxPrice = undefined;
            break;
        default:
    }

    return {
        minPrice, maxPrice
    }
}