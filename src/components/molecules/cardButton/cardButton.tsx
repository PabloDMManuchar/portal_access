import React from "react";
import "./cardButton.css";
// import Button from "../../atoms/buttons/button";

const cardsData = [
  {
    url: "https://www.manuchar.com/ar/es",
    icon: "fa-solid fa-globe",
    text: "MANUCHAR ARGENTINA",
  },
  {
    url: "http://10.9.0.103:80/apuntadores/DG",
    icon: "fa-regular fa-clipboard",
    text: "APUNTADORES DG",
  },
  {
    url: "http://10.9.0.103:80/apuntadores/SN",
    icon: "fa-regular fa-clipboard",
    text: "APUNTADORES SN",
  },
  {
    url: "http://10.9.0.103:80/stockit",
    icon: "fa-solid fa-boxes-stacked",
    text: "STOCK IT",
  },
  {
    url: "http://10.9.0.103:8080/",
    icon: "fa-light fa-chart-mixed",
    text: "INDENT",
  },
  {
    url: "https://www1.intiza.com/es/logon",
    icon: "fa-regular fa-object-ungroup",
    text: "INTIZA",
  },
  {
    url: "https://projects.zoho.com/portal/manucharar#mywork",
    icon: "fa-solid fa-list-check",
    text: "ZOHO PROJECT",
  },
  {
    url: "https://expense.zoho.com/app/831486532#/home/dashboard",
    icon: "fa-solid fa-dollar-sign",
    text: "ZOHO EXPENSE",
  },
  {
    url: "https://crm.zoho.com/crm/org821491361/tab/Home/begin",
    icon: "fa-solid fa-handshake",
    text: "ZOHO CRM",
  },
  {
    url: "https://desk.zoho.com/agent/manucharar/it-mesadeayuda/tickets/list/all-cases",
    icon: "fa-solid fa-address-book",
    text: "ZOHO SERVICE DESK",
  },
  {
    url: "https://app.qulture.rocks/users/sign_in",
    icon: "fa-solid fa-bars-progress",
    text: "QULTURE",
  },
  {
    url: "https://compliancecatalyst2-r1.bvdinfo.com/version-20231229-1-2/ComplianceCatalyst4/1/Companies/Search",
    icon: "fa-solid fa-eye",
    text: "COMPLIANCE",
  },
  {
    url: "https://www.microsoft365.com/?auth=2",
    icon: "fa-solid fa-envelope",
    text: "PORTAL OFFICE",
  },
  {
    url: "https://recibos3.banksa.com.ar/manuchar/#/",
    icon: "fa fa-paperclip",
    text: "BANKSA",
  },
];

// interface  {
//   url: string;
//   icon: string;
//   text: string;
// }

// <Button
//   key={index}
//   url={button?.url}
//   icon={button?.icon}
//   text={button?.text}
// />

const CardButton: React.FC<{group:'admin' | 'ventas' | 'comex' | string}> = ({group}) => (




  <div className="containerButton">
    {cardsData.map((card, index) => (
      <div key={index}className="min-w-60">
        <a
          href={card?.url}
          className="relative block overflow-hidden rounded-lg p-2 sm:p-6 lg:p-8 bg-slate-800 transition duration-300 ease-in-out transform hover:bg-slate-700 "
          // className="relative block overflow-hidden rounded-lg p-2 sm:p-6 lg:p-8 bg-slate-800 transition duration-300 ease-in-out transform hover:bg-slate-700 hover:scale-105"
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg text-white">{card?.text}</h3>

            <div className="py-3">
              <i className={`fa ${card?.icon} `}></i>
            </div>
          </div>
          {/* <div className="mt-4">
            <p className="text-pretty text-sm text-gray-500">{card?.text}</p>
          </div> */}

          {/* <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Published</dt>
              <dd className="text-xs text-gray-500">31st June, 2021</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">
                Reading time
              </dt>
              <dd className="text-xs text-gray-500">3 minute</dd>
            </div>
          </dl> */}
        </a>
      </div>
    ))}
  </div>
);

export default CardButton;
