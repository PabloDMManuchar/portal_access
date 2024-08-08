 
export type TLink = {
    url: string;
    icon: string;
    text: string;
    title: string;
    src: string;
}

export type TLinks = TLink[]


const data:TLinks = [
    {
      url: "https://www.manuchar.com/ar/es",
      icon: "fa-solid fa-globe",
      text: "MANUCHAR ARGENTINA",
      title: "MANUCHAR ARGENTINA",
      src: "https://www.manuchar.com/sites/default/files/styles/homepage_header_large/public/2022-05/foto%2001.jpg.webp?itok=k__Dj6Vg",
    },
    {
      url: "http://10.9.0.103:80/apuntadores/DG",
      icon: "fa-regular fa-clipboard",
      text: "APUNTADORES DG",
      title: "APUNTADORES DG",
      src: "http://10.9.0.103/apuntadores/background.png",
    },
    {
      url: "http://10.9.0.103:80/apuntadores/SN",
      icon: "fa-regular fa-clipboard",
      text: "APUNTADORES SN",
      title: "APUNTADORES SN",
      src: "http://10.9.0.103/apuntadores/background.png",
    },
    {
      url: "http://10.9.0.103:80/stockit",
      icon: "fa-solid fa-boxes-stacked",
      text: "STOCK IT",
      title: "STOCK IT",
      src: "	http://10.9.0.103/stockit/Content/adminlte/img/Stockit.jpg",
    },
    {
      url: "http://10.9.0.103:8080/",
      icon: "fa-light fa-chart-mixed",
      text: "INDENT",
      title: "INDENT",
      src: "http://10.9.0.103:8080/background.jpeg",
    },
    {
      url: "https://www1.intiza.com/es/logon",
      icon: "fa-regular fa-object-ungroup",
      text: "",
      title: "INTIZA",
      src: "https://cdn.intiza.com/content/web2/public/images/default-preview.png",
    },
  
    {
      url: "https://app.qulture.rocks/users/sign_in",
      icon: "fa-solid fa-bars-progress",
      text: "",
      title: "QULTURE",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MWuR8MnjgPgC7skAO8vwcZYXzE1iJpRsqA&s",
    },
    {
      url: "https://compliancecatalyst2-r1.bvdinfo.com/version-20231229-1-2/ComplianceCatalyst4/1/Companies/Search",
      icon: "fa-solid fa-eye",
      text: "",
      title: "COMPLIANCE",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjDYZNzRdORjqEAsSC-SVkIyuwy8R30KhLUA&s",
    },
    {
      url: "https://manuchar.sharepoint.com/",
      icon: "fa-solid fa-envelope",
      text: "",
      title: "Sharepoint",
      src: "data:image/jpeg;base64,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",
    },
  
    {
      url: "https://www.microsoft365.com/?auth=2",
      icon: "fa-solid fa-envelope",
      text: "",
      title: "PORTAL OFFICE",
      src: "data:image/png;base64,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",
    },
    {
      url: "https://recibos3.banksa.com.ar/manuchar/#/",
      icon: "fa fa-paperclip",
      text: "",
      title: "BANKSA",
      src: "data:image/png;base64,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",
    },
  
    {
      url: "https://projects.zoho.com/portal/manucharar#mywork",
      icon: "fa-solid fa-list-check",
      text: "",
      title: "ZOHO PROJECT",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JUcBRw_t51uWFVMwWRkJWUZff5uajMshBA&s",
    },
    {
      url: "https://expense.zoho.com/app/831486532#/home/dashboard",
      icon: "fa-solid fa-dollar-sign",
      text: "",
      title: "ZOHO EXPENSE",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmODy3VhsPi2EZy4tj5KSU_tYEa8hBmpvBjw&s",
    },
    {
      url: "https://crm.zoho.com/crm/org821491361/tab/Home/begin",
      icon: "fa-solid fa-handshake",
      text: "",
      title: "ZOHO CRM",
      src: "data:image/png;base64,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",
    },
    {
      url: "https://desk.zoho.com/agent/manucharar/it-mesadeayuda/tickets/list/all-cases",
      icon: "fa-solid fa-address-book",
      text: "",
      title: "ZOHO SERVICE DESK",
      src: "data:image/png;base64,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",
    },
  ];

export const links = {
    data,
};