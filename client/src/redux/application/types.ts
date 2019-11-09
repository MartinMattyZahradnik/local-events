export interface IState {
  code: string;
  name: string;
}

export interface ICountry extends IState {
  states: null | IState[];
}

export type ICountryList = ICountry[];

export type IApplicationReducerState = {
  countryList: {
    result: ICountryList;
    isLoading: boolean;
    error: boolean;
  };
};
