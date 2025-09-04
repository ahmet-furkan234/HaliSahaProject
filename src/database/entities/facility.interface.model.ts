
export interface IFacility {
    _id: string;
    name: string;
    description?: string;
    location: {
        city: string;
        district: string;
        address: string;
        geo: {
            type: "Point";
            coordinates: [number, number]; // [lon, lat]
        };
    };
    contacts: {
        phone: string | string[];
        email: string;
        website?: string;
        socialMedia?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
        };
    }
    rating: {
        average: number;   // Ortalama puan
        count: number;     // Kaç kişi oy vermiş
    };
    coverImage: string
    images: string[]
    features: string[]
}