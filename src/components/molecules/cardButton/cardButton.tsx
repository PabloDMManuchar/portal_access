import React from "react";
import "./cardButton.css";
import Button from "../../atoms/buttons/button";

const buttonsData = [
  {
    url: "https://www.manuchar.com/ar/es",
    icon: "fa-solid fa-globe",
    text: "WEB MANUCHAR ARGENTINA",
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

const CardButton: React.FC = () => (
  <div className="containerButton">
    {buttonsData.map((button, index) => (
      <Button
        key={index}
        url={button.url}
        icon={button.icon}
        text={button.text}
      />
    ))}
  </div>
);

export default CardButton;
