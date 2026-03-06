function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0]; 
  const data = sheet.getDataRange().getValues();
  
  let logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Official_Seal_of_Palayan_City.svg/1024px-Official_Seal_of_Palayan_City.svg.png";
  let bannerBg = ""; 
  const logoMap = {};
  const pictureMap = {}; 
  const locationMap = {}; // Map to store text from Column D
  
  function getDirectDriveUrl(url) {
    if (url && typeof url === 'string' && url.includes('drive.google.com')) {
      let id = "";
      if (url.includes('id=')) { id = url.split('id=')[1].split('&')[0]; }
      else { let parts = url.split('/d/'); if (parts.length > 1) { id = parts[1].split('/')[0]; } }
      return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w1000" : url;
    }
    return url;
  }

  for (let i = 0; i < data.length; i++) {
    const identifier = data[i][0] ? data[i][0].toString().trim() : "";
    if (identifier === "1.1") {
      if (data[i][1]) logoUrl = getDirectDriveUrl(data[i][1].toString());
      if (data[i][2]) bannerBg = getDirectDriveUrl(data[i][2].toString());
    } else if (identifier) {
      if (data[i][1]) logoMap[identifier] = getDirectDriveUrl(data[i][1].toString());
      if (data[i][2]) pictureMap[identifier] = getDirectDriveUrl(data[i][2].toString());
      
      // FETCH LOCATION FROM COLUMN D (Index 3)
      // This will capture whatever you type in the 4th column of your sheet
      if (data[i][3]) {
        locationMap[identifier] = data[i][3].toString().trim();
      }
    }
  }

  const departments = [
    { cat: "EXECUTIVE", name: "City Mayor's Office", acronym: "CMO", head: "Olga Rose Manuel - Berdon", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Issuance of Mayor's Clearance", "Solemnization of Marriage", "Financial Assistance"] },
    { cat: "EXECUTIVE", name: "Sangguniang Panlungsod", acronym: "SP", head: "Rufo S. Elegado", loc: "Second Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Legislative Services", "Resolutions and Ordinances"] },
    { cat: "ECONOMIC DEVELOPMENT", name: "City Agriculturist's Office", acronym: "CAGO", head: "Esmenia S. Lulu", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Seed Distribution", "Farming Consultations"] },
    { cat: "ECONOMIC DEVELOPMENT", name: "City Veterinarian's Office", acronym: "CVO", head: "Dr. Celso D. Mananggit", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Anti-Rabies Vaccination", "Livestock Health Services"] },
    { cat: "ECONOMIC DEVELOPMENT", name: "Local Economic Development and Investment Promotions Office", acronym: "LEPIDO", head: "Fercilyn Grospe", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Business Investment Inquiries"] },
    { cat: "ECONOMIC DEVELOPMENT", name: "City Labor & Employment Office", acronym: "CLEO", head: "Mar-Sem S. Mendillo", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Job Fairs", "Employment Referrals"] },
    { cat: "ECONOMIC DEVELOPMENT", name: "City Tourism Division", acronym: "CTD", head: "Eunice Nicole Alcantara", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Tourism Promotions", "Event Coordination"] },
    { cat: "FISCAL MANAGEMENT", name: "City Accountant's Office", acronym: "CACO", head: "Christina R. Yambot", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Internal Audit", "Financial Reporting"] },
    { cat: "FISCAL MANAGEMENT", name: "City Assessor's Office", acronym: "CASSO", head: "Emmanuel A. Aduna", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Real Property Assessment", "Tax Declarations"] },
    { cat: "FISCAL MANAGEMENT", name: "City Budget Office", acronym: "CBO", head: "Nicky S. Sagnip", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Budget Allocation and Review"] },
    { cat: "FISCAL MANAGEMENT", name: "Business Permit & Licensing Division", acronym: "BPLD", head: "Maria Raquel Sagnit", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["New Business Permits", "Business Permit Renewals", "Retirement of Business"] },
    { cat: "FISCAL MANAGEMENT", name: "City Treasurer's Office", acronym: "CTO", head: "Mary Jane F. Villareal", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Payment of Real Property Taxes", "Collection of Fees and Charges"] },
    { cat: "INFRASTRUCTURE & SAFETY", name: "Traffic Management & Public Safety Division", acronym: "TMPSD", head: "Thea Bantegui", loc: "Second Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Traffic Apprehensions", "Road Safety Assistance"] },
    { cat: "INFRASTRUCTURE & SAFETY", name: "City Engineering Office", acronym: "CEO", head: "Engr. Alexander Dela Merced", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["Building Permits", "Occupancy Permits", "Infrastructure Projects"] },
    { cat: "PUBLIC ADMINISTRATION", name: "City Planning & Development Office", acronym: "CPDO", head: "Arch. Margarita A. Angeles", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Zoning Clearances", "Comprehensive Land Use Plan"] },
    { cat: "PUBLIC ADMINISTRATION", name: "City General Services Office", acronym: "CGSO", head: "Reynaldo C. Alberto", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Procurement", "Asset Management"] },
    { cat: "PUBLIC ADMINISTRATION", name: "City Legal Office", acronym: "CLO", head: "Atty. John Kenner M. Mendoza", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Legal Counseling", "Contract Review"] },
    { cat: "PUBLIC ADMINISTRATION", name: "City Human Resource & Management Office", acronym: "CHRMO", head: "Dudley S. Romero", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Job Vacancies", "Employee Records"] },
    { cat: "PUBLIC ADMINISTRATION", name: "Library Division", acronym: "LIB", head: "Alicia L. Estanislao", loc: "Second Floor", time: "8:00 AM - 5:00 PM", services: ["Public Reading Area", "Research Assistance"] },
    { cat: "PUBLIC ADMINISTRATION", name: "Information & Technology Division", acronym: "ICT", head: "Feliciano C. Ramos Jr.", loc: "Ground Floor - Left", time: "8:00 AM - 5:00 PM", services: ["System Maintenance", "Tech Support"] },
    { cat: "SOCIAL SERVICES", name: "City Disaster Risk Reduction Office", acronym: "CDRRMO", head: "Ferdinand B. Hilado", loc: "Outside Main Bldg", time: "24/7", services: ["Emergency Rescue", "Disaster Preparedness Training"] },
    { cat: "SOCIAL SERVICES", name: "City Health Office", acronym: "CHO", head: "Dra. Shiela B. Flores", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Medical Consultations", "Immunizations", "Issuance of Medical/Health Certificates"] },
    { cat: "SOCIAL SERVICES", name: "City Social Welfare & Development Office", acronym: "CSWD", head: "Maria Teresa Ramos", loc: "Outside Main Bldg", time: "8:00 AM - 5:00 PM", services: ["Senior Citizen ID Application", "Solo Parent ID", "Assistance in Crisis Situations (AICS)"] },
    { cat: "SOCIAL SERVICES", name: "City Civil Registrar Office", acronym: "CCR", head: "Loribelle C. De Guzman", loc: "Ground Floor - Right", time: "8:00 AM - 5:00 PM", services: ["Birth Registration", "Marriage License", "Death Registration"] }
  ];

  // OVERWRITE HARDCODED LOCATIONS WITH DATA FROM COLUMN D
  departments.forEach(dept => {
    if (locationMap[dept.acronym]) {
      dept.loc = locationMap[dept.acronym];
    }
  });

  const groupedDepts = {};
  departments.forEach(d => {
    if (!groupedDepts[d.cat]) groupedDepts[d.cat] = [];
    groupedDepts[d.cat].push(d);
  });

  const template = HtmlService.createTemplateFromFile('Index');
  template.logoData = logoUrl;
  template.bannerBg = bannerBg; 
  template.logoMap = logoMap;
  template.pictureMap = pictureMap;
  template.groupedDepts = groupedDepts;
  
  return template.evaluate()
    .setTitle('Palayan City Directory')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}