export interface IIngredient{
    readonly _id: string,
    readonly name: string ,
    readonly type: string,
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    readonly __v: number,
    counter?: number;
    key: string;
} 

export interface ICardSorting{
    card: IIngredient;
    index: number
}


export interface IIngredientId{
    readonly _id: string
}


export interface ITypeAction<T> {
    type: T;
    payload: string
}

export interface IUserInfo{
    email: string;
    name: string;
    password?: string 
}

export type TAuthorization = {
    success: boolean,
    accessToken?: string,
    refreshToken?: string,
    user: IUserInfo
}

export interface IHistoryState{
     fromForgotPassword?: boolean | undefined;
     lastPage ?: string;
     background?: string;
}

export interface ILocationState {
    from: { pathname: string };
    background: string;
    lastPage : string;
    path: string;
  }


// export interface IResFetch {
//     ok?: boolean;
//     success?: string;
//     message?: string;
//     data?: any;
//     order?: {
//         number: string;
//     };
//     user?: IUserInfo | undefined;
//     err?: string;
//     accessToken?: string | undefined;
//     refreshToken?: string | undefined;
//     status: string;
//     json<T>(): Promise<T>;
// }

export interface IModal{
    onClose: () => void;
    header?: string;
    children: React.ReactNode;
}

export interface IDropItem{
    card: {
        type:string;
        key: () => string
    }
}




