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

export type TOrder = {
    ingredients: string[],
    name: string,
    _id: string,
    status: 'pending' | 'created' | 'done';
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface IMessageWS{
    wsConnected: boolean,
    orders: TOrder[] | [],
    total: null | number,
    totalToday: null | number,
    error?: Event
}


export interface IBackgroundLocation {
    background: {
      pathname: string
      search: string
      hash: string
      state: undefined
      key: string
    }
  }



