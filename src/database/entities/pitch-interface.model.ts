
export interface IPitch {
    _id : string;
    name: string;
    description?: string;
    width: number;
    length: number;
    dimensionType: "minimal" | "normal" | "büyük" | "yarı-büyük";
    hasStand: boolean;
    coverImage: string
    images: string[];
    maxPlayers: number;
    type: "açık" | "kapalı" | "hibrit";
    facilityId : string;
}