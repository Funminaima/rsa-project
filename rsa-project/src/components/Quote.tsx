import React from "react";
import { IAddon, IQuote } from "../type.d";

interface Props {
  quote: IQuote | null;
  formatQuoteDate: (dateString: string) => string | undefined;
  onClickSwitchButton: () => void;
  switchType: boolean;
  addons: IAddon[];
  onClickSelectExtra: (addon: IAddon) => void;
  calculateTotalPrice: () => number;
}

const Quote = ({
  quote,
  formatQuoteDate,
  switchType,
  onClickSwitchButton,
  addons,
  onClickSelectExtra,
  calculateTotalPrice,
}: Props) => {
  return (
    <div className="container">
      <header className="header">
        <h1>Home insurance</h1>
      </header>
      <section className="section-first">
        <div className="details">
          <h1>Hey, {quote?.firstName}</h1>
          <p>
            Here is your quote for Royal & Sun Alliance, St. Marks Court, Chart
            Way
          </p>{" "}
          <p>
            Quote reference:<strong>{quote?.quoteRef}</strong>
          </p>{" "}
          <p>
            Covers starts on{" "}
            <strong>{formatQuoteDate(quote?.startDate ?? "")}</strong>.
          </p>
        </div>
        <div className="payment-container">
          <h1>£{calculateTotalPrice().toFixed(2)}</h1>
          <h3>{switchType ? `per year` : `per month`}</h3>
          <div className="p-div">
            <p>
              This price includes Insurance Premium Tax at the current rate. No
              charge for paying {switchType ? `yearly` : `monthly`}.
            </p>
          </div>

          <button className="switch-btn" onClick={onClickSwitchButton}>
            {switchType ? `switch to monthly` : `Switch to annual`}
          </button>
        </div>
      </section>
      <h1 className="section-title">
        Tailor your cover with our optional extras
      </h1>
      <section className="section-second">
        {addons &&
          addons.map((addon: any) => {
            return (
              <div className={`extras-container`} key={addon.id}>
                <div className="flex">
                  <h2>{addon.title}</h2>
                  <p>
                    {switchType
                      ? `£${addon.annualPrice} per year`
                      : `£${addon.monthlyPrice} per month`}
                  </p>
                </div>
                <div className="content">
                  <p>{addon.text}</p>
                </div>

                <div className="btn-div">
                  <button
                    className={`btn ${addon.isSelected ? `selected` : ""}`}
                    type="button"
                    onClick={() => onClickSelectExtra(addon)}
                  >
                    {addon.isSelected ? "Remove" : "Select"} this extra
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Quote;
