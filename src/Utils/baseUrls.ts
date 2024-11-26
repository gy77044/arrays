import axios, { AxiosInstance } from "axios";
export const BaseURLString = process.env.NODE_ENV === "development" ?  process.env.REACT_APP_LOCALHOST : process.env.REACT_APP_HOST;
export const adminURL = process.env.NODE_ENV === "development" ?  process.env.REACT_APP_ADMIN_LOCALURL : process.env.REACT_APP_ADMIN_URL;
console.log(process.env.NODE_ENV,BaseURLString);

let activeRequests = 0;
const configureAxios = (): AxiosInstance => {
    let token = localStorage.getItem("token") || document.cookie;
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === "development" ? BaseURLString : BaseURLString,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `bearer ${token}`
        }
    });

    const showLoading = () => {
        if (activeRequests === 0) {
            setTimeout(()=>{
                if(document.getElementById("loading")){
                    document.getElementById("loading")!.className = "loading active";
                }
            },100)
        }
        activeRequests++;
    };

    const hideLoading = () => {
        activeRequests--;
        if (activeRequests === 0) {
            setTimeout(() => {
                // console.log(document.getElementById("loading"), 'loading-hide')
                if(document.getElementById("loading")){
                    document.getElementById("loading")!.className = "loading";
                }
            }, 1000);
        }
    };

    axiosInstance.interceptors.request.use(
        config => {
            showLoading(); // Show loading only once
            return config;
        },
        error => {
            hideLoading(); // Hide the loading if there was an error with the request
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => {
            hideLoading(); // Hide loading after a successful response
            return response;
        },
        error => {
            hideLoading();
            const { response } = error;
            if (response && (response.status === 401 || response.status === 403)) {
                // Redirect to login screen if unauthorized or forbidden
                window.location.href = '/'; // Update to your login route
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const baseURL:AxiosInstance = configureAxios()


export const requestUrl = {
    sendOTP: '/user/individual',
    getCountryCode:'/api/country_mstr',
    users: "/api/user_mstr",
    getInverterList: "/inverter",
    downloadFile: "/download",
    getCBList: "/cb",
    geIDTList: "/idt",
    uploadeModule: '/fileupload/module',
    uploadeIDTFile: '/idt/upload',
    uploadeCBFile: '/cb/upload',
    getModuleList: "/module",
    getModuleTitleList: "/module",
    getInvTitleList: "/inverter",
    uploadeModuleFile: '/upload',
    uploadInverter: '/fileupload/inverter',
    getMMSList: "/mms",
    login: "/login",
    loginMobile: "/login/mobile",
    emailOTP: "/email/otp",
    emailExists: "/api/auth/check",
    signup: "/signup",
    getmailotp: "/email-otp",
    verifyEmailOTP: '/api/auth/otp-verify',
    verifyEmailOtp:'/api/resetpassword/forgot-password-otp/verify',
    googleLogin: "/google",
    logout: "/logout/",
    signupCheck: "/api/auth/check",
    auth: "/api/auth",
    sendNewOtp: "/api/auth/otp",
    signupnopass: "/user_mstr/new",
    signupOrg: "/user_mstr/org",
    signupIndi: "/user/individual",
    getProjectList: "/api/project",
    orgnization: "/api/organization",
    forgotPassword:'/api/resetpassword/forgot-password',
    resetpassword: "/api/resetpassword/reset-password",
    project: "/api/projects",
    projectmode: "/api/projects/mode",
    projectdetails: "/api/projects/projectdeatils",
    refreshToken: "/api/token?token",
    searchNWS: "/api/metamodule",
    fetchNWS: "/api/metamodule/nws",
    getSAMData: "/api/pvCal",
    getpvNxtData:"http://192.168.29.37:8001/run_simulation",
    getconvStringData: "/api/dc/stringcal/conventional",
    getIECData: "/api/dc/stringcal/iec",
    getCBSizing: "/api/dc/gridSizing",
    getCBResistance: "/api/dc/resistance",
    stringtoSCB: "/api/dc/stringtoscb",
    scvtoInverter: "/api/dc/scbinverter",
    lacalculation: "/api/dc",
    kmltoGeoJson: "/api/ConvertGeoJson/kml-geojosn",
    dwgtoGeoJson: "/api/ConvertGeoJson/dwg-geojosn",
    shapetoGeoJson: "/api/ConvertGeoJson/shape-geojosn",
    csvtoGeoJson: "/api/ConvertGeoJson/csv-geojosn?",
    roofTop: "/rooftop/project",
    getuserType: "/api/usertype_mstr",
    getsubuserType: "/api/usersubtype_mstr/usertypes",
    getsupuserType: "/api/usersuptype_mstr",
    userTypeMap: "/api/usertype_map",
    userTypeMapId: "/usertype",
    tariffType: "/api/tariff",
    projectload: "/api/projectload",
    costbracket: "/api/tariffcostbracket_mstr",
    generationdegradation: "/api/tariffcostbracket_mstr/genaration-degradation",
    pvAPiMonthly: 'http://44.218.61.121:8002/PvNxtApi',
    samAPI: 'http://44.218.61.121:8005/run',
    financial: '/api/FinancialSaving',
    roofRequest:"/api/roofrequests",
    consumercategory: "/api/consumercategory/consumerslist",
    tariffRate: "/api/tariffProviderrate_mstr_/gettariffrate",
    discom:"/api/tariffProvider_mstr_/tariff",
    pvnxtapigeneration:'/api/pvnxtapi',
    getStateNamebyCountryID:'/api/state_mstr/states-by',
    getDistrictsNameByStateID:'/api/district_mstr/districts-by-ids',
    //EPC
    getEPCUsers: '/api/user_mstr/epcusers/',
    getRFPByEPCId:'/api/epc/AllPVNxtLeads/',
    getBidWonLeads:"/bidWonByEPC/",
    getAllProjectsSelfMode:"/api/projects/GetAllProjectsSelfMode",
    getSelfModeProjectCount:"/api/projects/SelfModeProjectsCountInEPCArea",
    getPlantCapacity:"/api/leadCount",
    saveEPCLeads:'/api/leads/add/',
    uploadEPCLeads:'/api/leads/upload/',
    saveEPC:'/api/epc',
    epcUserDetail:'/api/epc/user',
    getPvModule:'/manufacturer/',
    getPvModuleInfo:'/moduleinfo/',
    getPvInveter:'/name/',
    getPVInverterByCapacity:'api/pvinverter/search/inverterByCapacityAndName/',
    getPVCompatibleInvertersForModule:'/api/pvmodule_mstr/GetCompatibleInvertersForModule/',
    getPvInveterInfo:'/inverterinfo/',
    getPvInveterById:"/api/pvinverter/",
    getPvmodulebyid:"/api/pvmodule_mstr/",
    getWeatherData:'/api/weatherfile/csvdatawithlatlong/',
    getWeatherDataById:'/api/weatherfile/csvdatawithId/',
    uploadBuldOwnLead:'/api/leads/upload/',
    nearestEPC:"/nearest/",
    prjectcompletion:'/api/projects/completion',
    getUserDocument:"/api/documents/userdocs",
    downloadUserDoc:"/api/documents/file",
    qouteBidCost:"/update-bidcost",
    projectsByUser:"/api/projects/user",
    epcEpcProjectSummary:"/api/user_mstr/epcprojectsummary/",
    getProjectBasedOnEPC:"/ProjectsOfEPC/",
    GetConsumerCategoryList:"/api/consumercategory/GetConsumerCategoryList/",
    getmoduleAcCable :"/api/ModuleACcable",
    getmoduleDCcable :"/api/ModuleCBcable",
    saveLossCalculation :"/api/LossCalculation/",
    getSubscibedBasedOnPayLeads:'/api/subscribedLeadProjectMap/subscribeLeadsWithLeadCountId',
    getSubscribedLeads:"/api/subscribedLeadProjectMap/subscribedLeadsByEPC/",
    generationPvNXT:"/api/pvnxtapi/GenerationPvNxtV1/",
    generationSAM:"/api/SampAPI/GenerationSAMV1/",
    getNoOfString:'/rooftop/conventional',
    moduleFileUpload:"/api/fileupload/module/uploads",
    inverterFileUpload:"/api/fileupload/inverter/uploads",
    SupportEmail:"/SupportEmail",
    changeUserPassword:"/api/user_mstr/UpdateUserWithPassword"
    
}
export const OAuthClientID = process.env.REACT_APP_OAUTHCLIENTID as string
export const OAuthURL = process.env.REACT_APP_OAUTHURL
export const tokenURL = process.env 
