export interface IQuote {
  ddress1: string;
  address2: string;
  address3: string;
  annualPrice: number;
  firstName: string;
  lastName: string;
  monthlyPrice: string;
  postcode: string;
  quoteRef: string;
  startDate: string;
  town: string;
}

export interface IAddon {
  annualPrice: number;
  id: number;
  isSelected: Boolean;
  monthlyPrice: number;
  text: string;
  title: string;
}
