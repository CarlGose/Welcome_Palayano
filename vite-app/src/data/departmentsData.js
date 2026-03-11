const imgCMO = "/offices/CMO.jpg";
const imgSP = "/offices/SP.jpg";
const imgCAGO = "/offices/CAgO.jpg";
const imgCVO = "/offices/CVO.jpg";
const imgLEPIDO = "/offices/LEPIDO.jpg";
const imgCLEO = "/offices/CLEO.jpg";
const imgCTD = "/offices/DCDH.jpg";
const imgCACO = "/offices/CAccO.jpg";
const imgCASSO = "/offices/CSSAO.jpg";
const imgCBO = "/offices/CBO.jpg";
const imgCCR = "/offices/CCR, BPLC, CAssO, CTO.jpg";
const imgTMPSD = "/offices/TMPSD.jpg";
const imgCEO = "/offices/CEO.jpg";
const imgCPDO = "/offices/CPDO.jpg";
const imgCGSO = "/offices/CGSO.jpg";
const imgCLO = "/offices/CLO.jpg";
const imgCHRMO = "/offices/CHRMO.jpg";
const imgLIB = "/offices/LIB.jpeg";
const imgICT = "/offices/ICT.jpg";
const imgCDRRMO = "/offices/CDRRMO.jpeg";
const imgCHO = "/offices/CHO.jpeg";
const imgCSWD = "/offices/CSWDO.jpeg";

const logoCASSO = "/logos/assessor.jpg";
const logoCTO = "/logos/Treasure.jpg";
const logoCDRRMO = "/logos/cdrrmo.jpg";
const logoCCR = "/logos/civil_registrar.jpg";
const logoCSWD = "/logos/cswd.jpg";
const logoCEO = "/logos/engineering.jpg";
const logoICT = "/logos/ict.png";
const logoCPDO = "/logos/planning.jpg";
const logoCTD = "/logos/tourism.jpg";
const logoTMPSD = "/logos/traffic.jpg";
const logoCVO = "/logos/veterinary.jpg";
const logoLEPIDO = "/logos/Ledipo.png";
const logoSP = "/logos/Sangguniang-panglungsod.png";
const logoCAGO = "/logos/agriculture.png";
const logoCHO = "/logos/city-health.png";
const logoCLEO = "/logos/city-labor.png";
const logoLIB = "/logos/library.jpg";

export const localImageMap = {
  CMO: imgCMO,
  SP: imgSP,
  CAGO: imgCAGO,
  CVO: imgCVO,
  LEPIDO: imgLEPIDO,
  CLEO: imgCLEO,
  CTD: imgCTD,
  CACO: imgCACO,
  CASSO: imgCASSO,
  CBO: imgCBO,
  BPLD: imgCCR, // Shared image mapping
  CTO: imgCCR, // Shared image mapping
  TMPSD: imgTMPSD,
  CEO: imgCEO,
  CPDO: imgCPDO,
  CGSO: imgCGSO,
  CLO: imgCLO,
  CHRMO: imgCHRMO,
  LIB: imgLIB,
  ICT: imgICT,
  CDRRMO: imgCDRRMO,
  CHO: imgCHO,
  CSWD: imgCSWD,
  CCR: imgCCR,
};

export const localLogoMap = {
  CASSO: logoCASSO,
  CTO: logoCTO,
  CDRRMO: logoCDRRMO,
  CCR: logoCCR,
  CSWD: logoCSWD,
  CEO: logoCEO,
  ICT: logoICT,
  CPDO: logoCPDO,
  CTD: logoCTD,
  TMPSD: logoTMPSD,
  CVO: logoCVO,
  LEPIDO: logoLEPIDO,
  SP: logoSP,
  CAGO: logoCAGO,
  CHO: logoCHO,
  CLEO: logoCLEO,
  LIB: logoLIB,
};

export const initialDepartmentsData = [
  {
    cat: "EXECUTIVE",
    name: "City Mayor's Office",
    acronym: "CMO",
    logo: null,
    pic: imgCMO,
    head: "Olga Rose Manuel - Berdon",
    loc: "Second Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: [
      "Issuance of Mayor's Clearance",
      "Solemnization of Marriage",
      "Financial Assistance",
    ],
  },
  {
    cat: "EXECUTIVE",
    name: "Sangguniang Panlungsod",
    acronym: "SP",
    logo: logoSP,
    pic: imgSP,
    head: "Rufo S. Elegado",
    loc: "Second Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: ["Legislative Services", "Resolutions and Ordinances"],
  },
  {
    cat: "ECONOMIC DEVELOPMENT",
    name: "City Agriculturist's Office",
    acronym: "CAGO",
    logo: logoCAGO,
    pic: imgCAGO,
    head: "Esmenia S. Lulu",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["Seed Distribution", "Farming Consultations"],
  },
  {
    cat: "ECONOMIC DEVELOPMENT",
    name: "City Veterinarian's Office",
    acronym: "CVO",
    logo: logoCVO,
    pic: imgCVO,
    head: "Dr. Celso D. Mananggit",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["Anti-Rabies Vaccination", "Livestock Health Services"],
  },
  {
    cat: "ECONOMIC DEVELOPMENT",
    name: "Local Economic Development and Investment Promotions Office",
    acronym: "LEPIDO",
    logo: logoLEPIDO,
    pic: imgLEPIDO,
    head: "Fercilyn Grospe",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["Business Investment Inquiries"],
  },
  {
    cat: "ECONOMIC DEVELOPMENT",
    name: "City Labor & Employment Office",
    acronym: "CLEO",
    logo: logoCLEO,
    pic: imgCLEO,
    head: "Mar-Sem S. Mendillo",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["Job Fairs", "Employment Referrals"],
  },
  {
    cat: "ECONOMIC DEVELOPMENT",
    name: "City Tourism Division",
    acronym: "CTD",
    logo: logoCTD,
    pic: imgCTD,
    head: "Eunice Nicole Alcantara",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Tourism Promotions", "Event Coordination"],
  },
  {
    cat: "FISCAL MANAGEMENT",
    name: "City Accountant's Office",
    acronym: "CACO",
    logo: null,
    pic: imgCACO,
    head: "Christina R. Yambot",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: ["Internal Audit", "Financial Reporting"],
  },
  {
    cat: "FISCAL MANAGEMENT",
    name: "City Assessor's Office",
    acronym: "CASSO",
    logo: logoCASSO,
    pic: imgCASSO,
    head: "Emmanuel A. Aduna",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: ["Real Property Assessment", "Tax Declarations"],
  },
  {
    cat: "FISCAL MANAGEMENT",
    name: "City Budget Office",
    acronym: "CBO",
    logo: null,
    pic: imgCBO,
    head: "Nicky S. Sagnip",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: ["Budget Allocation and Review"],
  },
  {
    cat: "FISCAL MANAGEMENT",
    name: "Business Permit & Licensing Division",
    acronym: "BPLD",
    logo: null,
    pic: imgCCR,
    head: "Maria Raquel Sagnit",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: [
      "New Business Permits",
      "Business Permit Renewals",
      "Retirement of Business",
    ],
  },
  {
    cat: "FISCAL MANAGEMENT",
    name: "City Treasurer's Office",
    acronym: "CTO",
    logo: logoCTO,
    pic: imgCCR,
    head: "Mary Jane F. Villareal",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: [
      "Payment of Real Property Taxes",
      "Collection of Fees and Charges",
    ],
  },
  {
    cat: "INFRASTRUCTURE & SAFETY",
    name: "Traffic Management & Public Safety Division",
    acronym: "TMPSD",
    logo: logoTMPSD,
    pic: imgTMPSD,
    head: "Thea Bantegui",
    loc: "Second Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["Traffic Apprehensions", "Road Safety Assistance"],
  },
  {
    cat: "INFRASTRUCTURE & SAFETY",
    name: "City Engineering Office",
    acronym: "CEO",
    logo: logoCEO,
    pic: imgCEO,
    head: "Engr. Alexander Dela Merced",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: [
      "Building Permits",
      "Occupancy Permits",
      "Infrastructure Projects",
    ],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "City Planning & Development Office",
    acronym: "CPDO",
    logo: logoCPDO,
    pic: imgCPDO,
    head: "Arch. Margarita A. Angeles",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Zoning Clearances", "Comprehensive Land Use Plan"],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "City General Services Office",
    acronym: "CGSO",
    logo: null,
    pic: imgCGSO,
    head: "Reynaldo C. Alberto",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Procurement", "Asset Management"],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "City Legal Office",
    acronym: "CLO",
    logo: null,
    pic: imgCLO,
    head: "Atty. John Kenner M. Mendoza",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Legal Counseling", "Contract Review"],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "City Human Resource & Management Office",
    acronym: "CHRMO",
    logo: null,
    pic: imgCHRMO,
    head: "Dudley S. Romero",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Job Vacancies", "Employee Records"],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "Library Division",
    acronym: "LIB",
    logo: logoLIB,
    pic: imgLIB,
    head: "Alicia L. Estanislao",
    loc: "Second Floor",
    time: "8:00 AM - 5:00 PM",
    services: ["Public Reading Area", "Research Assistance"],
  },
  {
    cat: "PUBLIC ADMINISTRATION",
    name: "Information & Technology Division",
    acronym: "ICT",
    logo: logoICT,
    pic: imgICT,
    head: "Feliciano C. Ramos Jr.",
    loc: "Ground Floor - Left",
    time: "8:00 AM - 5:00 PM",
    services: ["System Maintenance", "Tech Support"],
  },
  {
    cat: "SOCIAL SERVICES",
    name: "City Disaster Risk Reduction Office",
    acronym: "CDRRMO",
    logo: logoCDRRMO,
    pic: imgCDRRMO,
    head: "Ferdinand B. Hilado",
    loc: "Outside Main Bldg",
    time: "24/7",
    services: ["Emergency Rescue", "Disaster Preparedness Training"],
  },
  {
    cat: "SOCIAL SERVICES",
    name: "City Health Office",
    acronym: "CHO",
    logo: logoCHO,
    pic: imgCHO,
    head: "Dra. Shiela B. Flores",
    loc: "Outside Main Bldg",
    time: "8:00 AM - 5:00 PM",
    services: [
      "Medical Consultations",
      "Immunizations",
      "Issuance of Medical/Health Certificates",
    ],
  },
  {
    cat: "SOCIAL SERVICES",
    name: "City Social Welfare & Development Office",
    acronym: "CSWD",
    logo: logoCSWD,
    pic: imgCSWD,
    head: "Maria Teresa Ramos",
    loc: "Outside Main Bldg",
    time: "8:00 AM - 5:00 PM",
    services: [
      "Senior Citizen ID Application",
      "Solo Parent ID",
      "Assistance in Crisis Situations (AICS)",
    ],
  },
  {
    cat: "SOCIAL SERVICES",
    name: "City Civil Registrar Office",
    acronym: "CCR",
    logo: logoCCR,
    pic: imgCCR,
    head: "Loribelle C. De Guzman",
    loc: "Ground Floor - Right",
    time: "8:00 AM - 5:00 PM",
    services: ["Birth Registration", "Marriage License", "Death Registration"],
  },
];
