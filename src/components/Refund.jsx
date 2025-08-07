import Footer from "./Footer";

const Refund = () => {
  return (
    <>
      <style>
        {`
          .policy-list {
            list-style: disc;
            padding-left: 1.5rem;
          }
        `}
      </style>
      <div className="p-2 sm:p-[5vh] mt-[14vh]">
        <h1 className="edu-title m-t text-[30px] sm:text-[30px] font-bold">
          Cancellation and Refund Policy
        </h1>
        <hr className="w-full" />
        <br />
        <p>
          Thailash believes in helping its customers as far as possible, and has
          therefore a liberal cancellation policy. Under this policy:
        </p>
        <br />
        <ul className="policy-list space-y-2">
          <li>
            Our refund and returns policy lasts 7 days. If 7 days have passed
            since your purchase, we can’t offer you a full refund or exchanges.
          </li>
          <li>
            To be eligible for a return, your item must be unused and in the
            same condition that you received it. It must also be in the original
            packaging.
          </li>
          <li>
            To complete your return, we require a receipt or proof of purchase.
          </li>
          <li>
            Please do not send your purchase back to the manufacturer.
          </li>
          <li>
            There are certain situations where only partial refunds are granted.
          </li>
          <li>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.
          </li>
          <li>
            If you are approved, then your refund will be processed, and a
            credit will automatically be applied to your credit card or original
            method of payment within 7 days.
          </li>
          <li>Only regular priced items may be refunded. Sale items cannot be refunded.</li>
          <li>
            We only replace items if they are defective or damaged. If you need
            to exchange it for the same item, send us an email at contact@thailash.com
            and send your item to: THAILASH ORIGINAL THENNAMARAKDI OIL,
3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108.
          </li>
          <li>
            All approved exchanges/replacements will be completed and delivered
            within 10 business days.
          </li>
          <li>
            To return your product, you should mail your product to: THAILASH ORIGINAL THENNAMARAKDI OIL,
3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108.
          </li>
          <li>
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable. If you
            receive a refund, the cost of return shipping will be deducted from
            your refund.
          </li>
          <li>
            Depending on where you live, the time it may take for your exchanged
            product to reach you may vary.
          </li>
          <li>
            If you are returning more expensive items, you may consider using a
            trackable shipping service or purchasing shipping insurance. We
            don’t guarantee that we will receive your returned item.
          </li>
          <li>
            Need help? Contact us at contact@thailash.com for questions related to
            refunds and returns.
          </li>
        </ul>
      </div>

      <Footer width={100} />
    </>
  );
};

export default Refund;
