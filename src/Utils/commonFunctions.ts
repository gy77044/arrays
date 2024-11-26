import { ChangeEvent } from "react";
import { setCardTitle } from "../ReduxTool/Slice/Dashboard/DashboardReducer";
import { AppDispatch } from "../ReduxTool/store/store";
import { routeMap } from "../Containers/DefaultLayouts/DefaultProtectedContainer";
import { useRef } from "react";
import { user_mstr_modal } from "../ReduxTool/Slice/Auth/types";
import { baseURL } from "./baseUrls";
import { AxiosResponse } from "axios";
import { APIResponse, selectOptionType } from "./Const";
import { toast } from "react-toastify";
// import { LeadType } from "../ReduxTool/Slice/Partner/EPC";
import moment from "moment";
import jsPDF from "jspdf";
import * as countries from 'country-data'
import bgimagepdf from "../assests/img/Dashboard/bg_solar.png"
import frontpagelogoterr from "../assests/img/Dashboard/image 36.png"
import locationimg from "../assests/img/Dashboard/location_on.png";
import apartmentimg from "../assests/img/Dashboard/apartment.png";
import 'jspdf-autotable';
import { CountryData, defaultCountries, parseCountry } from "react-international-phone";
import parsePhoneNumberFromString from "libphonenumber-js";

declare module 'jspdf' {
  interface jsPDF {
      autoTable: (options: any) => jsPDF;
      previous: { finalY: number };
      lastAutoTable?: { finalY: number }; // Add this line
  }
}


export const setLocalToken = (token: string) => {
  return localStorage.setItem('token', token)
};

export const getLocalToken = () => {
  return localStorage.getItem('token')
};
export const sethassceenStatus = (status: string) => {
  return localStorage.setItem('firsttimelogin', status)
};

//Remove widespace from string
export const removeWideSpace = (string: string) => {
  return string.replace(/\s/g, '');
};
//Trim Strings
export const trimString = (string: string) => {
  return string.trim();
};
//Generate random number
export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};
export const uniqueKey = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
//Generate random ids
export const newgeneratedId = (name?: string) => {
  let id = "ABC".toLowerCase().slice(0, 8) + "_" + generateRandomId() + "_0";
  if (name) {
    id = removeWideSpace(name).toLowerCase().slice(0, 8) + "_" + generateRandomId() + "_0";
  };
  return id;
};
//Get index of any array of list
export const getIndexByValue = (arr: any, value: string | number) => arr?.findIndex((item: any) => item.title === value);
//filter data by array usign key
export const filterKeyIncludeArr = (arr: any[], key: string, value: string | number | boolean) => arr?.filter(el => el[key] === value);
//Find Multi Array based on Key
export function getIndexWiseDetails(JSONData: any[], index: number) {
  let list = null;
  if (JSONData && JSONData[index]) {
    list = JSONData[index];
  }
  return list;
};
export const matchKeyIncludeArr = (arr: any[], key: string, value: string) => {
  let result = arr;
  if (value) {
    result = arr?.filter(el => el[key].includes(value));
  };
  return result;
};
//filter Multi Array based on Array List Include Key
export function filterMultiListIncludeByArrList(JSONData: any, keyName: string, ArrayList: any) {
  let list = [];
  if (JSONData && JSONData.length > 0 && ArrayList && ArrayList.length > 0) {
    list = JSONData.filter((obj: any) => ArrayList.some((element: any) => obj[keyName] == element));
  } else {
    list = JSONData;
  };
  return list;
};
export const getElementByIndex = (arr: any[], indx: number, keyName?: any) => {
  let result = "";
  if (arr && arr.length && arr[indx]) result = arr[indx];
  if (keyName) result = result[keyName as keyof object];
  return result;
};

export const handleTabNavbars = (dispatch: AppDispatch, title: string) => {
  dispatch(setCardTitle(title));
};

export const getActiveClass = (activeCard: string, name: any, className: string) => activeCard.trim() === name.trim() ? className : "tab-inactive";
export const getActivePageTitle = (pathname: string, title?: string) => getElementByIndex(filterKeyIncludeArr(routeMap[pathname], title ? "title" : "path", title ? title : pathname), 0, title ? "tooltip" : "title");

export const generateRandomData = (numRows: number, keys: any[]) => {
  let randomData = [] as any;
  const getRandomValue = (prefix: string) => `${prefix}${Math.floor(Math.random() * 1000)}`;

  for (let i = 1; i <= numRows; i++) {
    let rowData = { index: i } as any
    keys.forEach(el => {
      rowData[el] = getRandomValue(el);
    })
    randomData.push(rowData);
  }

  return randomData;
};


//debounce

export const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunc = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunc;
};

export function CSVFileReader(e: ChangeEvent<HTMLInputElement>) {
  const file = (e.target.files as FileList)[0]

  const reader = new FileReader();
  reader.onload = (e) => {
    const response = e.target?.result;
    // console.log(response, 'file-read-csv')
  }
  reader.onerror = (e) => {
    console.error(e)
  }
};

export const getColsRowsCombination = (groupSize: number) => {
  const columns = Math.ceil(Math.sqrt(groupSize));
  const rows = Math.ceil(groupSize / columns);
  return { columns, rows }
};

export const isTruthy = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  } else if (Array.isArray(value)) {
    return value.length > 0;
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  } else if (typeof value === 'number') {
    return !isNaN(value);
  } else {
    return !!value;
  }
};


export const getNameFromString = <T extends string | string[]>(input: T, delimiter: string | RegExp, index: number = -1): string => {
  const parts = typeof input === 'string' ? input.split(delimiter) : input;
  const resolvedIndex = index < 0 ? parts.length + index : index;
  return parts[resolvedIndex] || '';
}
//Download File
export const downloadFile = async(csvURL: string) => {
  let isExcelFile = false;
  if (csvURL.includes(".xlsx") || csvURL.includes(".xls")) {
    isExcelFile = true;
  }
  var filename = csvURL.substring(csvURL.lastIndexOf('/') + 1);
  let excelFileBlob = { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
  try {
    let {data}:AxiosResponse<APIResponse<any>> = await baseURL.get(csvURL, { responseType: "blob" });
      if(data.code === "200"){
          const a = document.createElement("a");
          if (isExcelFile) {
            a.href = URL.createObjectURL(new Blob([data.responseData], excelFileBlob));
          } else {
            a.href = URL.createObjectURL(new Blob([data.responseData]));
          }
          a.setAttribute("download", filename);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
    
  }catch(e){ 
    toast.error("Unable to download file..") 
  }
}
export function downloadFileFromApi(url:string, filename:string) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};


export const dcPowerBasedOnSanctionload = (sanctionload:number)=>{
  return `${isFinite(sanctionload! / 1.25) ? Math.abs(sanctionload! / 1.25 - Math.floor(sanctionload! / 1.25)) >= 0.5 ? Math.ceil(sanctionload! / 1.25): Math.floor(sanctionload! / 1.25): 0} kW`
}

export const calculateRatio = (num_1: number, num_2: number): string => {
  for (let num = num_2; num > 1; num--) {
      if ((num_1 % num) === 0 && (num_2 % num) === 0) {
          num_1 = num_1 / num;
          num_2 = num_2 / num;
      }
  }
  const ratio = num_1 + ":" + num_2;
  return ratio;
};




export const formatNumberByCountry=(number:string, countryCode:string, currency = 'INR')=> {
  let locale;
 
  switch (countryCode) {
    case '+91':
      locale = 'en-IN';
      break;
    case '+1':
      locale = 'en-US';
      break;
    // Add more country codes and their respective locales as needed
    default:
      locale = 'en-IN';  // Default to Indian locale if country code is not recognized
  }
 
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseInt(number));
};

export const camelCaseToWordFormat=(str:string)=>{
  const wordFormatStr = str.replace(/([A-Z])/g, ' $1').toLowerCase();
  return wordFormatStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
}

// utils/currencyFormatter.ts
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

export const capitalizedObjKeys = (obj:any) => {
  const capitalizedObj = {} as any;

  for (const key in obj) {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      capitalizedObj[capitalizedKey] = capitalizedObjKeys(obj[key]);
    } else {
      capitalizedObj[capitalizedKey] = obj[key];
    }
  }

  return capitalizedObj;
}

export const dateFormater = (date: string, newFormat: string, format?: string) => {
//    if (newDate.getHours()>12){
//     const hours = newDate.getHours()/12 
//     console.log("hours",hours)
//    }
    return moment(new Date(date)).format(newFormat)
}
export const checkValue = (value:any) =>{
  return value ? value : ""
}


export const toTitleCase = (str:string | null) => {
  if (str){
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return ""
};
export const getInverterQuantity = (sanctionload:number,inveterCapacity:number)=>{
  try{
    const acCapacity = dcPowerBasedOnSanctionload(sanctionload);
    return Math.ceil((inveterCapacity/1000)/parseFloat(acCapacity.split(" ")[0]));
  }catch(err){
    console.log(err);
    return 0;
  }
}


type StateAbbreviation = {
  state: string;
  abbreviation: string;
};

const allStates: StateAbbreviation[] = [
  { state: "Andhra Pradesh", abbreviation: "AP" },
  { state: "Arunachal Pradesh", abbreviation: "AR" },
  { state: "Assam", abbreviation: "AS" },
  { state: "Bihar", abbreviation: "BR" },
  { state: "Chhattisgarh", abbreviation: "CG" },
  { state: "Goa", abbreviation: "GA" },
  { state: "Gujarat", abbreviation: "GJ" },
  { state: "Haryana", abbreviation: "HR" },
  { state: "Himachal Pradesh", abbreviation: "HP" },
  { state: "Jharkhand", abbreviation: "JH" },
  { state: "Karnataka", abbreviation: "KA" },
  { state: "Kerala", abbreviation: "KL" },
  { state: "Madhya Pradesh", abbreviation: "MP" },
  { state: "Maharashtra", abbreviation: "MH" },
  { state: "Manipur", abbreviation: "MN" },
  { state: "Meghalaya", abbreviation: "ML" },
  { state: "Mizoram", abbreviation: "MZ" },
  { state: "Nagaland", abbreviation: "NL" },
  { state: "Odisha", abbreviation: "OD" },
  { state: "Punjab", abbreviation: "PB" },
  { state: "Rajasthan", abbreviation: "RJ" },
  { state: "Sikkim", abbreviation: "SK" },
  { state: "Tamil Nadu", abbreviation: "TN" },
  { state: "Telangana", abbreviation: "TS" },
  { state: "Tripura", abbreviation: "TR" },
  { state: "Uttar Pradesh", abbreviation: "UP" },
  { state: "Uttarakhand", abbreviation: "UK" },
  { state: "West Bengal", abbreviation: "WB" },
  { state: "Andaman and Nicobar Islands", abbreviation: "AN" },
  { state: "Chandigarh", abbreviation: "CH" },
  { state: "Dadra and Nagar Haveli and Daman and Diu", abbreviation: "DN" },
  { state: "Delhi", abbreviation: "DL" },
  { state: "Lakshadweep", abbreviation: "LD" },
  { state: "Puducherry", abbreviation: "PY" }
]

export const  getStateAbbreviations=(statesList: string[]): string =>{
  // Filter the list to return only states from the input list
  let result:string="";
   allStates.forEach(each=>statesList.includes(each.state)? result = result!=="" ? result+", "+ each.abbreviation:each.abbreviation:result)
   return result;
}

export const StateAbbreviationExcluded = (statesList: string[]):string[]=>{

    const stateExcluded =  allStates.filter(stateObj => !statesList.includes(stateObj.state));
    return stateExcluded.map(each=>each.abbreviation)
}

export const loadImageAsBase64 = async (imageSrc: string): Promise<string> => {
  const img = new Image();
  img.src = imageSrc;

  return new Promise((resolve, reject) => {
      img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
  });
};

export const robotoMedium = "base64-encoded-string-of-roboto-medium";
interface emptyRow {
  content: string;
  colSpan: number;
  styles: {
      halign: string;
  };
}

const calculateExactTableHeight = (columns: any[], rows: any[]) => {
  // Create a temporary hidden jsPDF instance to calculate the height
  const tempDoc = new jsPDF();
  
  // Variable to track the height as the table is drawn
  let finalY = 0;

  // AutoTable simulation to calculate height
  tempDoc.autoTable({
    head: [columns],
    body: rows,
    startY: 0, // Start at the top
    didDrawCell: (data:any) => {
      // Capture the Y position after each cell is drawn
      finalY = Math.max(finalY, data.cursor.y);
    },
  });

  // Return the final Y position which is the total height
  return finalY;
};


export const downloadPDFFile = async(title:string,tableData:any[],logoimage:string,projectAddress:string,plantcapcity:string,projectname:string,EPCDetails:string,consumerdetails:string,epcobj:any,projectimg?:string)=>{
  const doc = new jsPDF();
  const defaultColumnNames = ["S.No", "Equipment Name", "UOM", "Quantity", "Proposed Make", "Specification"];

  // get the number of lines 

  const numberLines = (text:string,textWidth:number)=>{
    const maxLineWidth = pageWidth - textWidth;

    let words = text.split(' ');

    let lines: string[] = [];
    let currentLine = "";
  
    words.forEach((word, index) => {
        const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
        const testLineWidth = doc.getTextWidth(testLine);
  
        if (testLineWidth < maxLineWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
  
        if (index === words.length - 1) {
            lines.push(currentLine);
        }
    });

    return lines.length
  
}


const textcenter = ( text: string, fontsize: number, positiony: number, lineheight: number, positionx: number, textWidth: number, heading?: string,alignhalfwidth?:number ) => {
      // Set initial font size
      doc.setFontSize(fontsize);    
      const maxLineWidth = pageWidth - textWidth;
      const phoneRegex = /\+?\d{1,4}\s\d{10}/g;
      const formatedtext = text.replace(phoneRegex, (match) => match.replace(/\s/, '\u00A0'));

      const  words = formatedtext.split(' ');   
   
      let lines: string[] = [];
      let currentLine = "";
    
      words.forEach((word, index) => {
        const testLine = currentLine.length === 0 ? word :`${currentLine} ${word}`;
        const testLineWidth = doc.getTextWidth(testLine);
    
        if (testLineWidth < maxLineWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
    
        if (index === words.length - 1) {
          lines.push(currentLine);
        }
      });
    
      let yPos = positiony;
    
      lines.forEach((line, lineIndex) => {
        const lineWidth = doc.getTextWidth(line);
        let linePosition=0;
        if (alignhalfwidth){
          linePosition = (pageWidth/2 - lineWidth)/2 +15;
        }
        else{
          linePosition = positionx === 2 ? (pageWidth - lineWidth) / 2 : 12;
        }

    
        // Only for the first line, add the heading in bold
        if (lineIndex === 0) {
          // Set font to bold and add the heading
          let headingWidth=0;
          if (heading){
            doc.setFontSize(9)
            doc.setTextColor("#0c2d35")
            doc.text(heading, linePosition, yPos);
            headingWidth = doc.getTextWidth(heading)
            doc.setFontSize(8)
            doc.setTextColor("#505050")

            // Reset font to normal and add the rest of the text after the heading
          }
          doc.text(line, linePosition + headingWidth + 2, yPos); // Adjusted x-position after heading
    
    
        } 
        else if(alignhalfwidth){
          doc.text(line, linePosition, yPos);
        } else {
          // For subsequent lines, just render the normal text
          doc.text(line, linePosition, yPos);
        }    
        yPos += lineheight;
      });
    };
  // const titleFontSize = 24;
  const headingFontSize = 12;
  const subHeadingFontSize = 10;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Load images as base64
  const logoImageBase64 = await loadImageAsBase64(logoimage);
  const largeImageBase64 = await loadImageAsBase64(bgimagepdf);
  const frontpagelogo = await loadImageAsBase64(frontpagelogoterr);  
  const locationicon = await loadImageAsBase64(locationimg); 
  const apartmenticon = await loadImageAsBase64(apartmentimg)
doc.addImage(largeImageBase64, 'PNG', 0, 0, pageWidth, pageHeight); //bg image

doc.addImage(frontpagelogo, 'PNG', (pageWidth-60)/2, 15, 60, 16);
doc.setTextColor("#113F4A");

let frontpageYposition = 55
const projectnamecapacitytext = `${projectname} - ${plantcapcity}`
textcenter(projectnamecapacitytext.toUpperCase(),20,frontpageYposition,8,2,60,"")
frontpageYposition+=numberLines(projectnamecapacitytext,60)*8
doc.setTextColor("#587880")
textcenter(`Roof Design ${title}`,16,frontpageYposition,6,2,130,"")
frontpageYposition +=53



const detailswidth = pageWidth-(pageWidth/100)*40-20

    // EPC Details
    doc.setFontSize(12);
    doc.addImage(apartmenticon,44, frontpageYposition-6,7,7)

    doc.setTextColor("#113F4A")
    textcenter("EPC Details",17,frontpageYposition,6,2,detailswidth,"",4)
    frontpageYposition+=8
 
    doc.setTextColor("#587880")
    const epcdetailstext = `${toTitleCase(epcobj.companyname)} | ${epcobj.email} | ${epcobj.mobile} | ${epcobj.registrationNo}`
    textcenter(epcdetailstext,14,frontpageYposition,6,2,detailswidth,"",4)
    frontpageYposition += numberLines(epcdetailstext,detailswidth)*7+5
    
    // Site Address
    doc.setFontSize(12);
    doc.setTextColor("#113F4A")
    doc.addImage(locationicon,44, frontpageYposition-4.5,5,5)
    textcenter("Site Address",17,frontpageYposition,6,2,detailswidth,"",4)
    frontpageYposition+=8
    doc.setTextColor("#587880")
    textcenter(`${projectAddress}`,14,frontpageYposition,7,2,detailswidth,"",4)


let finalY:number=40
// adding project image if provided
if (projectimg){
  doc.addPage()
  doc.setTextColor("#113F4A")
  doc.setFontSize(headingFontSize)
  doc.text("Roof Design",12,45)
  doc.addImage(projectimg, 'PNG', 12, 48, 190, pageHeight/3);
  finalY += 25+pageHeight/3;
}else{
  doc.addPage()
}

const tableObj = (value:any,columns:any,columnWidth:number,isempty:boolean)=>{
  return     doc?.autoTable({
    startY: finalY + 4,
    head: [columns],
    body:isempty?[value]: value.map((item:any) => Object.values(item)),
    theme: 'grid',
    headStyles: { fillColor: [17, 63, 74] },
    columnStyles: columns.reduce((styles:any, col:any, index:number) => {
        styles[index] = { cellWidth: columnWidth, overflow: 'linebreak' } 
        return styles;
    }, {}),
    margin: { top: 30,left:11 },   
    didDrawPage: (data:any) => {
      // If it's not the first page, adjust the Y position of the next page's table content
      const pageCount = doc.internal.pages.length - 1;
      if (pageCount > 1) {
        doc.setPage(pageCount);
        data.settings.margin.top = 40; // Set the top margin for the next page's content
      }
    }         
});
}

  Object.keys(tableData).forEach((key) => {
      const value = tableData[key as keyof object];
      doc.setFontSize(headingFontSize);

      if (Array.isArray(value)) { // add table if it has only single array
          const columns = value.length > 0 ? Object.keys(value[0]) : defaultColumnNames;
          // Calculate column width for grid layout
          const columnWidth = (pageWidth - 20) / columns.length;
          const tableHeight = (value.length + 1) * 10;
          // const tableHeight = calculateExactTableHeight(value,columns)
          const spaceLeft = pageHeight - finalY - 60;
      
      const currentPageNo = doc.getCurrentPageInfo().pageNumber
        if (currentPageNo>1){
          if (pageHeight>tableHeight){
            if (spaceLeft < tableHeight) {
                doc.addPage();
                finalY = 40;
            }
          }
        }
        doc.setTextColor("black")
          doc.text(key, 11, finalY);         

          if (value.length > 0) {
            // tableFuc(columns,columnWidth,value,)
            tableObj(value,columns,columnWidth,false)
          } else {
              const emptyRow:emptyRow[] = [{ content: "No Details Found", colSpan: columns.length, styles: { halign: 'center' } }];
              // tableFuc(columns,columnWidth,value,emptyRow)
              tableObj(emptyRow,columns,columnWidth,true)
          }

          finalY = doc.lastAutoTable?.finalY ?? finalY + 10;
          finalY += 10;
      } else if (typeof value === "object" && value !== null && Object.keys(value).length > 0) { // adding tables if the value is an object
        const firstKey = Object.keys(value)[0]
        const tableHeight = (value[firstKey].length + 1) * 10;
        // const tableHeight = calculateExactTableHeight(value[firstKey],Object.keys(value))

        const spaceLeft = pageHeight - finalY - 60;
        if (spaceLeft < tableHeight) {
            doc.addPage();
            finalY = 40;       
           }     
          doc.text(key, 12, finalY);
          finalY += 8;
          
          Object.keys(value).forEach((subKey) => {
              const subValue = value[subKey];
              doc.setFontSize(subHeadingFontSize);
              const columns = Array.isArray(subValue) && subValue.length > 0 ? Object.keys(subValue[0]) : defaultColumnNames;
              // const subTableHeight = (subValue.length + 1) * 18;
              const subTableHeight =  calculateExactTableHeight(value[subKey],Object.keys(value))
              const subSpaceLeft = pageHeight - finalY - 60;
              if (subSpaceLeft < subTableHeight) {
                  doc.addPage();
                  finalY = 40;
              }

              doc.text(subKey, 12, finalY);

              if (Array.isArray(subValue) && subValue.length > 0) {
            const columnWidth = (pageWidth - 20) / columns.length;
              tableObj(subValue,columns,columnWidth,false)
              } else {
                  const emptyRow = [{ content: "No Details Found", colSpan: columns.length, styles: { halign: 'center' } }];
                  const columnWidth = (pageWidth - 20) / columns.length;
                  tableObj(emptyRow,columns,columnWidth,true)              
              }

              finalY = doc.lastAutoTable?.finalY ?? finalY + 10;
              finalY += 10;
          });
      }
  });
  // Add pagination and logo to subsequent pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      doc.addImage(logoImageBase64, 'PNG', 10, 10, 25, 6);    
      //adding epc details line
      doc.setTextColor("#505050")
      textcenter(EPCDetails,8,25,5,0,30,"EPC Details -");            
      finalY = 20 + numberLines(`EPC Details - ${EPCDetails}`,30)*7 + 4;
      //adding consumer details line
      doc.setTextColor("#505050")
      textcenter(consumerdetails,8,finalY,5,0,30,"Consumer Details -");    
      finalY += numberLines(`Consumer Details - ${consumerdetails}`,30)*7 +20
      //adding page number
      doc.setTextColor("black")      
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 30, 15);
  }
  // Save the PDF
  doc.save(`${title}.pdf`);
}

export function newformatDate(date: Date): string {
  const day = date.getDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  // Format day and minutes with leading zeros if necessary
  const formattedDay = (day < 10) ? `0${day}` : `${day}`;
  const formattedMinutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

  return `${formattedDay}-${month}-${year}`;
}

export const getCountryData = (countryName: string) => {
    return countries.lookup.countries({ name: countryName });
}

/**
 * The function generates a unique ID for a project based on the user's first name, last name, project
 * length, and current date.
 * @param {string} firstname - The `firstname` parameter is a string that represents the first name of
 * a person.
 * @param {string} lastname - The `lastname` parameter is a string that represents the last name of the
 * person.
 * @param {number} projectLength - The `projectLength` parameter represents the length or number of
 * projects that have already been created.
 * @returns a unique ID for a project. The ID is generated based on the provided parameters: firstname,
 * lastname, and projectLength. The ID format is
 * `${data.alpha3}${'NOI'}__`.
 */
export const generateTheUniqueIdforProject = (firstname: string, lastname: string, projectLength: number) =>{
    const data = (getCountryData('India'))[0];
    // data.alpha3 countyr alpha 3 code 
    const roofType = 'RT';
    // data in `${year}-${month}-${day}`
    const currentDate = formatDate(new Date());  
    // user initials 
    if(!firstname) return ""
    const first = firstname?.charAt(0).toLocaleUpperCase();
    const last = lastname?.charAt(0).toLocaleUpperCase();
    const intitals = `${first}${last}0${projectLength+1}`;
    return `${data.alpha3}${'NOI'}_${roofType}${currentDate}_${intitals}`;
  }
  /**
 * The formatDate function takes a Date object and returns a formatted string in the format "YYMMDD".
 * @param {Date} date - The `date` parameter is of type `Date`, which represents a specific point in
 * time. It can be any valid JavaScript `Date` object.
 * @returns a formatted date string in the format "YYMMDD".
 */
export function formatDate(date: Date) {
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to the month (0-based) and ensure two-digit format
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day format
    return `${year}${month}${day}`;
}

type Address = {
  address?: string;
  city?: string;
  district:string
  state?: string;
  country?: string;
  pincode?:string;
  countryAbbr?:string;
};



// export const formatAddress = (address: Address | undefined): string => {
//   const addressParts = [];

//   if (address?.address) addressParts.push(address.address);
//   if (address?.city) addressParts.push(address.city);
//   if (address?.district) addressParts.push(address.district);
//   if (address?.state) addressParts.push(address.state);
//   if (address?.pincode) addressParts.push(address.pincode);
//   if (address?.countryAbbr) addressParts.push(address.countryAbbr);

//   // Join the address parts with commas, but only include the non-empty fields
//   return addressParts.join(", ");
// };

export const getmoduleCost = (inverterCapacity:number,moduleCount:number,modulePerCost:number) => {
  const WATT_CONVERSION = 1000,BASE_COST = 12000,INITIAL_CAPACITY = 310,COST_INCREMENT = 800;
  try {
    // if (!inverterCapacity && typeof inverterCapacity !== 'number' || inverterCapacity <= 0) {
    //   throw new Error('Invalid inverter capacity. It must be a positive number.');
    // }
    // if (!moduleCount && typeof moduleCount !== 'number' || moduleCount <= 0) {
    //   throw new Error('Invalid module count. It must be a positive number.');
    // }
    // let inverterCost = 0;
    // let initialCost = BASE_COST;
 
    // if (inverterCapacity < INITIAL_CAPACITY) {
    //   inverterCost = moduleCount * initialCost;
    // } else {
    //   initialCost += Math.ceil((inverterCapacity - (INITIAL_CAPACITY - 1)) / 10) * COST_INCREMENT;
    //   console.log(initialCost);
      
    //   inverterCost = initialCost * moduleCount;
    // }
  console.log(moduleCount,"moduleCount");

    let inverterCost = moduleCount * modulePerCost
    return inverterCost ;
  } catch (err: any) {
    console.log(err);
  }
};
 
export const getInverterCost = (sanctionload: number,inverterCapacity:number,inverterPerCost:number):number=> {
  // const WATT_CONVERSION = 1000,BASE_COST = 20,INITIAL_CAPACITY = 310,COST_INCREMENT = 10;
  // try {
  //   if (!inverterCapacity && typeof inverterCapacity !== 'number' || inverterCapacity <= 0) {
  //     throw new Error('Invalid inverter capacity. It must be a positive number.');
  //   }
 
  //   let inverterCost = 0;
  //   let initialCost = BASE_COST;
 
  //   if (inverterCapacity < INITIAL_CAPACITY) {
  //     inverterCost = inverterCapacity * initialCost * WATT_CONVERSION;
  //   } else {
  //     initialCost += Math.ceil((inverterCapacity - (INITIAL_CAPACITY - 1)) / COST_INCREMENT);
  //     inverterCost = initialCost * inverterCapacity * WATT_CONVERSION;
  //   }
  //   return inverterCost;
  // } catch (err: any) {
  //   console.log(err);
  // }
  let inverter_count = getInverterQuantity(sanctionload, inverterCapacity)||0;
  console.log(inverter_count,"inverterCount",inverterCapacity,"inverterCapacity");
  
  return inverter_count * inverterPerCost
  // let p = Math.ceil(inverterCapacity/1000);
  // let B, F;
  // if (p >= 1 && p <= 5) {
  //   B = 6000;
  //   F = 5000;
  // } else if (p > 5 && p <= 20) {
  //   B = 15000;
  //   F = 7000;
  // } else if (p > 20 && p <= 50) {
  //   B = 50000;
  //   F = 10000;
  // } else {
  //   B = 50000;
  //   F = 10000;
  // }
  
  // let C = B + (inverter_count * F);
  // return C;
  // let cost = 0;
  // const btw1To3 = 5000,btw3To5 = 8000,btw5To8 = 11000,btw8To11=14000,btw11To14=17000,btw14To17 = 20000,btw17kwTo20kw = 23000;
  // if(inverterCapacity>1 && inverterCapacity<3){
  //   cost = inverterCapacity * btw1To3;
  // }else if(inverterCapacity>3 && inverterCapacity<5){
  //   cost = inverterCapacity * btw3To5;
  // }else if(inverterCapacity>5 && inverterCapacity<8){
  //   cost = inverterCapacity * btw5To8;
  // }else if(inverterCapacity>8 && inverterCapacity<11){
  //   cost = inverterCapacity * btw8To11;
  // }else if(inverterCapacity>11 && inverterCapacity<14){
  //   cost = inverterCapacity * btw11To14;
  // }else if(inverterCapacity>14 && inverterCapacity<17){
  //   cost = inverterCapacity * btw14To17;
  // }else if(inverterCapacity>17 && inverterCapacity<20){
  //   cost = inverterCapacity * btw17kwTo20kw;
  // }else{
  //   cost = inverterCapacity * 30000;
  // };  
  // return cost;
};
export const deleteObjectKeys=(obj1:{ [key: string]: any },obj2:{ [key: string]: any }): { [key: string]: any } =>{
  const result = { ...obj1 };
  for (const key in obj2) {
    if (key in result) {
      delete result[key];
    }
  }
  return result;
};
export const getfilterObjKeysByArr=(obj: { [key: string]: any }, keysToRetain: string[]): { [key: string]: any }=> {
  const result: { [key: string]: any } = {};
  for (const key of keysToRetain) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

export const fetchCompleteAddressStr = (addressobj:any) =>Object.values(addressobj).filter(Boolean).join(', ');
export const formateCamalCaseTospace = (str:string) => str.replace(/([A-Z])/g, ' $1').trim();

export function formatReactSelectOptions<T extends boolean>(arr: any[] | null | undefined,keys: { labelKey: string; valueKey: string },isSelectOption: T): T extends true ? selectOptionType : selectOptionType[] {
  try{
    if (!Array.isArray(arr) || !keys || !keys.labelKey || !keys.valueKey) {
      return [] as any;
    }
    return arr.map(el => {
      const label = el[keys.labelKey];
      const value = el[keys.valueKey];
      if (isSelectOption) {
        return {
          label:  el[keys.labelKey] !== undefined ?  el[keys.labelKey] : '',
          value: el[keys.valueKey] !== undefined ? el[keys.valueKey] : ''
        };
      } else {
        return {label:label !== undefined ? toTitleCase(label) : '', value:value !== undefined ? value : ''} as selectOptionType;
      }
    }) as any;
  }catch(err){
    console.log(err);
    return [] as any;
  } 
}

export const isValidName =  (input: string): boolean => {
  return /^[a-zA-Z]+$/.test(input);
};

export const serviceCountries = (reqCountry:string[])=>{
  return  defaultCountries.filter((country) => {
     const { iso2 } = parseCountry(country);
     return reqCountry.includes(iso2)
   })
 }


 export const isPhoneNumberValid = async(phoneNumber:any, countryCode:any) => {
  try {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode);
    return parsedNumber ? parsedNumber.isValid() : false;
  } catch (error) {
    return false; // Handle parsing errors
  }
};

export const base64ToImage = (base64String: string, contentType: string = 'image/jpeg') => {
  const byteCharacters = atob(base64String);  // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};


//** convert base64 string to image */
export const handleBase64ToImage = (base64String: string) => {
  const imageBlob = base64ToImage(base64String);
  // const imageUrl = URL.createObjectURL(imageBlob);

  return imageBlob
};

//****convert  image to base64 string*/



export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);  // Resolve with the base64 string
      };
      reader.onerror = (error) => {
          reject(error);  // Reject if there's an error reading the file
      };
      reader.readAsDataURL(file);
  });
};


export const testPassword = (input:string) => /^[^\s]+$/.test(input);
