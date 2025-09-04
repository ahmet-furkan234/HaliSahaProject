export interface ISession {
    _id : string;
    pitchId : string;
    startDate : Date;
    endDate : Date;
    depositPrice : number;
    totalPrice : number;
    isBooked: boolean;
}