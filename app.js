require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── MOCK DATA ────────────────────────────────────────────────────────────────
// Replace each section with a real SQL query when DB is connected.

const technicians = [
  { TechnicianKey: 204, TechnicianName: 'Allen Martello',  Color: 'rgb(80,180,80)'   },
  { TechnicianKey: 208, TechnicianName: 'Bill Hurd',       Color: 'rgb(200,180,0)'   },
  { TechnicianKey: 189, TechnicianName: 'Charles Kaufman', Color: 'rgb(0,170,200)'   },
  { TechnicianKey: 215, TechnicianName: 'Tim Reese',       Color: 'rgb(210,80,150)'  },
];

const clients = [
  { ClientKey: 3785, ClientName: 'Halifax Medical Center - FL',             Address: '303 N Clyde Morris Blvd', CityStateZip: 'Daytona Beach, FL 32114'  },
  { ClientKey: 3544, ClientName: 'Walter Reed National Military Med',        Address: '8901 Wisconsin Ave',      CityStateZip: 'Bethesda, MD 20889'       },
  { ClientKey: 3703, ClientName: 'Inspira Medical Ctr - Vineland',           Address: '1505 W Sherman Ave',      CityStateZip: 'Vineland, NJ 08360'       },
  { ClientKey: 7859, ClientName: 'Inspira Medical Ctr - Mullica Hill - NJ', Address: '3 Inspira Dr',            CityStateZip: 'Mullica Hill, NJ 08062'   },
  { ClientKey: 6183, ClientName: 'Wills Eye Hospital - PA',                  Address: '840 Walnut St',           CityStateZip: 'Philadelphia, PA 19107'   },
  { ClientKey: 6509, ClientName: 'HCA Florida South Tampa Hospital - FL',    Address: '4 Columbia Dr',           CityStateZip: 'Tampa, FL 33606'          },
  { ClientKey: 7851, ClientName: 'HCA Florida Brandon Hospital',             Address: '119 Oakfield Dr',         CityStateZip: 'Brandon, FL 33511'        },
  { ClientKey: 7148, ClientName: 'NCH Downtown Baker Hospital - FL',         Address: '350 7th St N',            CityStateZip: 'Naples, FL 34102'         },
  { ClientKey: 8040, ClientName: 'NCH Business Center - FL',                 Address: '1100 Immokalee Rd',       CityStateZip: 'Naples, FL 34110'         },
  { ClientKey: 8014, ClientName: 'BayCare Surgery Center (Trinity) - FL',    Address: '2200 Livingston Rd',      CityStateZip: 'Trinity, FL 34655'        },
  { ClientKey: 6748, ClientName: 'Twin Lakes Surgery Center - FL',           Address: '1225 Cypress Gardens Blvd', CityStateZip: 'Winter Haven, FL 33884' },
  { ClientKey: 6749, ClientName: 'Halifax Health UF Health - Deltona',       Address: '3656 Providence Blvd',    CityStateZip: 'Deltona, FL 32725'        },
  { ClientKey: 6305, ClientName: 'Wills Eye Surgery Center - Cherry Hill',   Address: '2014 Springdale Rd',      CityStateZip: 'Cherry Hill, NJ 08003'    },
  { ClientKey: 4758, ClientName: 'NCH North Naples Hospital',                Address: '11190 Health Park Blvd',  CityStateZip: 'Naples, FL 34110'         },
  { ClientKey: 6553, ClientName: 'HCA Florida Kendall Hospital - FL',        Address: '11750 SW 40th St',        CityStateZip: 'Miami, FL 33175'          },
  { ClientKey: 6692, ClientName: 'Lakewood Ranch Medical Center - FL',       Address: '8330 Lakewood Ranch Blvd', CityStateZip: 'Bradenton, FL 34202'     },
];

const departments = [
  { DepartmentKey: 9360, ClientKey: 3785, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9361, ClientKey: 3544, DepartmentName: 'Surgical Services'           },
  { DepartmentKey: 9362, ClientKey: 3703, DepartmentName: 'Central Sterile Processing'  },
  { DepartmentKey: 9363, ClientKey: 7859, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9364, ClientKey: 7859, DepartmentName: 'OR'                          },
  { DepartmentKey: 9365, ClientKey: 6183, DepartmentName: 'Central Sterile Processing'  },
  { DepartmentKey: 9366, ClientKey: 6509, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9367, ClientKey: 7851, DepartmentName: 'Central Sterile Processing'  },
  { DepartmentKey: 9368, ClientKey: 7148, DepartmentName: 'Central Sterile Processing'  },
  { DepartmentKey: 9369, ClientKey: 8040, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9370, ClientKey: 8014, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9371, ClientKey: 6748, DepartmentName: 'Surgery'                     },
  { DepartmentKey: 9372, ClientKey: 6749, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9373, ClientKey: 6305, DepartmentName: 'Surgical Center'             },
  { DepartmentKey: 9374, ClientKey: 4758, DepartmentName: 'Central Sterile Processing'  },
  { DepartmentKey: 9375, ClientKey: 6553, DepartmentName: 'Sterile Processing'          },
  { DepartmentKey: 9376, ClientKey: 6692, DepartmentName: 'Sterile Processing'          },
];

const calendarEvents = [
  { EventKey: 1,  ClientKey: 3785, ClientName: 'Halifax Medical Center - FL',         DepartmentName: 'Sterile Processing',         TechnicianKey: 189, EventDate: '2026-03-02', ServiceLocation: 'North' },
  { EventKey: 2,  ClientKey: 3785, ClientName: 'Halifax Medical Center - FL',         DepartmentName: 'Sterile Processing',         TechnicianKey: 189, EventDate: '2026-03-03', ServiceLocation: 'North' },
  { EventKey: 3,  ClientKey: 3544, ClientName: 'Walter Reed National Military Med',   DepartmentName: 'Surgical Services',          TechnicianKey: 215, EventDate: '2026-03-04', ServiceLocation: 'North' },
  { EventKey: 4,  ClientKey: 3703, ClientName: 'Inspira Medical Ctr - Vineland',      DepartmentName: 'Central Sterile Processing', TechnicianKey: 204, EventDate: '2026-03-06', ServiceLocation: 'North' },
  { EventKey: 5,  ClientKey: 3785, ClientName: 'Halifax Medical Center - FL',         DepartmentName: 'Sterile Processing',         TechnicianKey: 189, EventDate: '2026-03-09', ServiceLocation: 'North' },
  { EventKey: 6,  ClientKey: 3544, ClientName: 'Walter Reed National Military Med',   DepartmentName: 'Surgical Services',          TechnicianKey: 215, EventDate: '2026-03-10', ServiceLocation: 'North' },
  { EventKey: 7,  ClientKey: 6183, ClientName: 'Wills Eye Hospital - PA',             DepartmentName: 'Central Sterile Processing', TechnicianKey: 204, EventDate: '2026-03-12', ServiceLocation: 'North' },
  { EventKey: 8,  ClientKey: 6509, ClientName: 'HCA Florida South Tampa Hospital',    DepartmentName: 'Sterile Processing',         TechnicianKey: 189, EventDate: '2026-03-14', ServiceLocation: 'South' },
  { EventKey: 9,  ClientKey: 7859, ClientName: 'Inspira Mullica Hill - NJ',           DepartmentName: 'Sterile Processing',         TechnicianKey: 204, EventDate: '2026-03-16', ServiceLocation: 'North' },
  { EventKey: 10, ClientKey: 7851, ClientName: 'HCA Florida Brandon Hospital',        DepartmentName: 'Central Sterile Processing', TechnicianKey: 208, EventDate: '2026-03-21', ServiceLocation: 'South' },
  { EventKey: 11, ClientKey: 8014, ClientName: 'BayCare Surgery Ctr (Trinity) - FL',  DepartmentName: 'Sterile Processing',        TechnicianKey: 204, EventDate: '2026-03-22', ServiceLocation: 'South' },
  { EventKey: 12, ClientKey: 7148, ClientName: 'NCH Downtown Baker Hospital - FL',    DepartmentName: 'Central Sterile Processing', TechnicianKey: 204, EventDate: '2026-03-24', ServiceLocation: 'South' },
  { EventKey: 13, ClientKey: 7859, ClientName: 'Inspira Mullica Hill - NJ',           DepartmentName: 'Sterile Processing',         TechnicianKey: 204, EventDate: '2026-03-27', ServiceLocation: 'North' },
  { EventKey: 14, ClientKey: 6749, ClientName: 'Halifax Health UF Health - Deltona',  DepartmentName: 'Sterile Processing',         TechnicianKey: 204, EventDate: '2026-03-28', ServiceLocation: 'South' },
];

const siteServices = [
  { SiteServiceKey: 101, ClientKey: 3785, ClientName: 'Halifax Medical Center - FL', DepartmentKey: 9360, DepartmentName: 'Sterile Processing', TechnicianKey: 189, TechnicianName: 'Charles Kaufman', OnsiteDate: '2026-03-02', DateSubmitted: '2026-03-02', Status: 'submitted', PurchaseOrder: '', WorkOrder: 'WO-2026-0312', ServiceLocation: 'North', Address: '303 N Clyde Morris Blvd', CityStateZip: 'Daytona Beach, FL 32114', PriceClass: 'Standard Onsite Service', TruckNumber: '001', StartTime: '08:00', EndTime: '14:30', Notes: 'All scopes inspected. 2 sent for repair.', TrayCount: 2, CalcedCost: 110.38 },
  { SiteServiceKey: 102, ClientKey: 3785, ClientName: 'Halifax Medical Center - FL', DepartmentKey: 9360, DepartmentName: 'Sterile Processing', TechnicianKey: 189, TechnicianName: 'Charles Kaufman', OnsiteDate: '2026-03-09', DateSubmitted: null, Status: 'draft', PurchaseOrder: '', WorkOrder: '', ServiceLocation: 'North', Address: '303 N Clyde Morris Blvd', CityStateZip: 'Daytona Beach, FL 32114', PriceClass: 'Standard Onsite Service', TruckNumber: '001', StartTime: '', EndTime: '', Notes: '', TrayCount: 0, CalcedCost: 0 },
  { SiteServiceKey: 103, ClientKey: 6509, ClientName: 'HCA Florida South Tampa Hospital - FL', DepartmentKey: 9366, DepartmentName: 'Sterile Processing', TechnicianKey: 189, TechnicianName: 'Charles Kaufman', OnsiteDate: '2026-03-14', DateSubmitted: null, Status: 'draft', PurchaseOrder: 'HCA-9912', WorkOrder: '', ServiceLocation: 'South', Address: '4 Columbia Dr', CityStateZip: 'Tampa, FL 33606', PriceClass: 'Standard Onsite Service', TruckNumber: '002', StartTime: '', EndTime: '', Notes: '', TrayCount: 0, CalcedCost: 0 },
  { SiteServiceKey: 104, ClientKey: 3544, ClientName: 'Walter Reed National Military Med', DepartmentKey: 9361, DepartmentName: 'Surgical Services', TechnicianKey: 215, TechnicianName: 'Tim Reese', OnsiteDate: '2026-03-04', DateSubmitted: '2026-03-04', Status: 'submitted', PurchaseOrder: 'WR-2026-091', WorkOrder: 'WO-2026-0298', ServiceLocation: 'North', Address: '8901 Wisconsin Ave', CityStateZip: 'Bethesda, MD 20889', PriceClass: 'Standard Onsite Service', TruckNumber: '003', StartTime: '07:00', EndTime: '15:00', Notes: 'Good visit. Facility requested quarterly review.', TrayCount: 5, CalcedCost: 269.50 },
  { SiteServiceKey: 105, ClientKey: 6183, ClientName: 'Wills Eye Hospital - PA', DepartmentKey: 9365, DepartmentName: 'Central Sterile Processing', TechnicianKey: 204, TechnicianName: 'Allen Martello', OnsiteDate: '2026-03-12', DateSubmitted: null, Status: 'draft', PurchaseOrder: '', WorkOrder: '', ServiceLocation: 'North', Address: '840 Walnut St', CityStateZip: 'Philadelphia, PA 19107', PriceClass: 'Standard Onsite Service', TruckNumber: '004', StartTime: '', EndTime: '', Notes: '', TrayCount: 0, CalcedCost: 0 },
  { SiteServiceKey: 106, ClientKey: 7851, ClientName: 'HCA Florida Brandon Hospital', DepartmentKey: 9367, DepartmentName: 'Central Sterile Processing', TechnicianKey: 208, TechnicianName: 'Bill Hurd', OnsiteDate: '2026-03-21', DateSubmitted: null, Status: 'draft', PurchaseOrder: '', WorkOrder: '', ServiceLocation: 'South', Address: '119 Oakfield Dr', CityStateZip: 'Brandon, FL 33511', PriceClass: 'Standard Onsite Service', TruckNumber: '002', StartTime: '', EndTime: '', Notes: '', TrayCount: 0, CalcedCost: 0 },
];

const instrumentTypes = [
  { Code: 'Adson Forceps',                   Price:  4.75 }, { Code: 'Allis Clamp',                    Price:  5.20 },
  { Code: 'Allis Tissue Forceps',            Price:  5.20 }, { Code: 'Army-Navy Retractor',             Price:  6.40 },
  { Code: 'Babcock Forceps',                 Price:  5.50 }, { Code: 'Backhaus Towel Clip',             Price:  3.10 },
  { Code: 'Bard-Parker Handle #3',           Price:  4.25 }, { Code: 'Bard-Parker Handle #4',           Price:  4.25 },
  { Code: 'Baum Curette',                    Price:  7.80 }, { Code: 'Bishop-Harmon Forceps',           Price:  8.40 },
  { Code: 'Bone Rongeur',                    Price: 18.50 }, { Code: 'Brown-Adson Forceps',             Price:  5.10 },
  { Code: 'Castroviejo Needle Holder',       Price: 22.00 }, { Code: 'Castroviejo Scissors',            Price: 28.50 },
  { Code: 'Crile Hemostat - Curved',         Price:  4.20 }, { Code: 'Crile Hemostat - Straight',       Price:  4.20 },
  { Code: 'Curved Mayo Scissors',            Price:  7.50 }, { Code: 'Curved Metzenbaum Scissors',      Price:  9.20 },
  { Code: 'DeBakey Forceps - 6"',            Price:  6.80 }, { Code: 'DeBakey Forceps - 8"',            Price:  7.40 },
  { Code: 'Deaver Retractor',                Price:  9.50 }, { Code: 'Dressing Forceps',                Price:  3.80 },
  { Code: 'Duct Bill Rongeur',               Price: 20.00 }, { Code: 'Duval Lung Forceps',              Price:  6.90 },
  { Code: 'Ear Curette',                     Price:  5.50 }, { Code: 'Eye Speculum',                    Price: 14.20 },
  { Code: 'Farabeuf Retractor',              Price:  7.20 }, { Code: 'Ferguson Gallstone Forceps',      Price:  7.80 },
  { Code: 'Fine Point Scissors',             Price:  8.60 }, { Code: 'Foerster Sponge Forceps',         Price:  5.60 },
  { Code: 'Frazier Suction Tip',             Price:  4.50 }, { Code: 'Gelpi Retractor',                 Price: 12.50 },
  { Code: 'Gerald Forceps',                  Price:  6.30 }, { Code: 'Halsted Mosquito - Curved',       Price:  3.60 },
  { Code: 'Halsted Mosquito - Straight',     Price:  3.60 }, { Code: 'Harrington Retractor',            Price: 11.00 },
  { Code: 'Hegar Dilator',                   Price:  6.20 }, { Code: 'Hemoclip Applier',                Price: 18.00 },
  { Code: 'Iowa Trumpet',                    Price:  8.90 }, { Code: 'Jacobson Needle Holder',          Price: 16.50 },
  { Code: 'Jansen Rongeur',                  Price: 22.00 }, { Code: 'Kelly Hemostat - Curved',         Price:  4.40 },
  { Code: 'Kelly Hemostat - Straight',       Price:  4.40 }, { Code: 'Kern Bone Holding Forceps',       Price: 15.00 },
  { Code: 'Kerrison Rongeur',                Price: 25.00 }, { Code: 'Kocher Hemostat',                 Price:  4.80 },
  { Code: 'Laparoscopic Grasper',            Price: 32.00 }, { Code: 'Laparoscopic Scissors',           Price: 35.00 },
  { Code: 'Laser Probe',                     Price: 45.00 }, { Code: 'Liston Bone Cutting Forceps',     Price: 28.00 },
  { Code: 'Luer Rongeur',                    Price: 20.00 }, { Code: 'Lung Tissue Forceps',             Price:  8.50 },
  { Code: 'Mayo Scissors - Straight',        Price:  7.50 }, { Code: 'Mayo-Hegar Needle Holder',        Price:  8.86 },
  { Code: 'Metzenbaum Scissors - Straight',  Price:  9.20 }, { Code: 'Micro Scissors',                  Price: 38.00 },
  { Code: 'Microforceps',                    Price: 42.00 }, { Code: 'Mixter Right Angle Forceps',      Price:  6.50 },
  { Code: 'Murphy Gallbladder Trocar',       Price: 14.00 }, { Code: 'Needle Holder - 6"',              Price:  8.86 },
  { Code: 'Needle Holder - 7"',             Price:  9.40 }, { Code: 'Obwegeser Retractor',             Price: 12.00 },
  { Code: 'Ochsner Clamp',                   Price:  4.80 }, { Code: 'Ophthalmologic Forceps',          Price: 16.00 },
  { Code: 'Pennington Forceps',              Price:  5.40 }, { Code: 'Pituitary Rongeur',               Price: 28.00 },
  { Code: 'Plain Thumb Forceps',             Price:  3.80 }, { Code: 'Probe & Groove Director',         Price:  4.20 },
  { Code: 'Richardson Retractor',            Price:  9.80 }, { Code: 'Right Angle Clamp',               Price:  6.50 },
  { Code: 'Rochester-Carmalt Clamp',         Price:  5.10 }, { Code: 'Rochester-Pean Clamp',            Price:  5.00 },
  { Code: 'Russian Forceps',                 Price:  5.20 }, { Code: 'Satinsky Vascular Clamp',         Price: 24.00 },
  { Code: 'Senn Retractor',                  Price:  6.80 }, { Code: 'Sims Uterine Sound',              Price:  5.50 },
  { Code: 'Skin Hook',                       Price:  4.60 }, { Code: 'Sponge Forceps',                  Price:  5.60 },
  { Code: 'Sternum Punch',                   Price: 45.00 }, { Code: 'Suture Scissors',                 Price:  4.50 },
  { Code: 'Takahashi Forceps',               Price: 18.50 }, { Code: 'Tenaculum Forceps',               Price:  6.20 },
  { Code: 'Thumb Dressing Forceps',          Price:  3.80 }, { Code: 'Tissue Forceps - 2x3',            Price:  5.00 },
  { Code: 'Tissue Forceps - 3x4',            Price:  5.20 }, { Code: 'Towel Clamp',                     Price:  3.10 },
  { Code: 'Trocar',                          Price: 28.00 }, { Code: 'Utility Scissors',                Price:  4.50 },
  { Code: 'Vascular Scissors',               Price: 14.00 }, { Code: 'Webster Needle Holder',           Price:  8.40 },
  { Code: 'Wire Scissors',                   Price:  6.80 }, { Code: 'Yankauer Suction',                Price:  1.26 },
];

const trays = [
  { TrayKey: 1, SiteServiceKey: 101, TrayName: 'GI Tray A' },
  { TrayKey: 2, SiteServiceKey: 101, TrayName: 'GI Tray B' },
  { TrayKey: 3, SiteServiceKey: 104, TrayName: 'Scope Tray 1' },
  { TrayKey: 4, SiteServiceKey: 104, TrayName: 'Scope Tray 2' },
  { TrayKey: 5, SiteServiceKey: 104, TrayName: 'Scope Tray 3' },
  { TrayKey: 6, SiteServiceKey: 104, TrayName: 'OR Tray A' },
  { TrayKey: 7, SiteServiceKey: 104, TrayName: 'OR Tray B' },
];

const trayItems = [
  { ItemKey:  1, TrayKey: 1, InstrumentType: 'Crile Hemostat - Curved',     UnitPrice: 4.20, TotalCount: 3, RepairedCount: 3, SentToTSICount: 0, BERCount: 0 },
  { ItemKey:  2, TrayKey: 1, InstrumentType: 'Mayo-Hegar Needle Holder',    UnitPrice: 8.86, TotalCount: 4, RepairedCount: 3, SentToTSICount: 1, BERCount: 0 },
  { ItemKey:  3, TrayKey: 1, InstrumentType: 'Curved Metzenbaum Scissors',  UnitPrice: 9.20, TotalCount: 3, RepairedCount: 3, SentToTSICount: 0, BERCount: 0 },
  { ItemKey:  4, TrayKey: 1, InstrumentType: 'Kelly Hemostat - Curved',     UnitPrice: 4.40, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey:  5, TrayKey: 2, InstrumentType: 'Halsted Mosquito - Curved',   UnitPrice: 3.60, TotalCount: 4, RepairedCount: 3, SentToTSICount: 0, BERCount: 1 },
  { ItemKey:  6, TrayKey: 2, InstrumentType: 'Allis Tissue Forceps',        UnitPrice: 5.20, TotalCount: 3, RepairedCount: 2, SentToTSICount: 1, BERCount: 0 },
  { ItemKey:  7, TrayKey: 2, InstrumentType: 'DeBakey Forceps - 6"',        UnitPrice: 6.80, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey:  8, TrayKey: 2, InstrumentType: 'Sponge Forceps',              UnitPrice: 5.60, TotalCount: 1, RepairedCount: 0, SentToTSICount: 1, BERCount: 0 },
  { ItemKey:  9, TrayKey: 3, InstrumentType: 'Needle Holder - 6"',          UnitPrice: 8.86, TotalCount: 3, RepairedCount: 2, SentToTSICount: 1, BERCount: 0 },
  { ItemKey: 10, TrayKey: 3, InstrumentType: 'Curved Mayo Scissors',        UnitPrice: 7.50, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 11, TrayKey: 3, InstrumentType: 'Kelly Hemostat - Straight',   UnitPrice: 4.40, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 12, TrayKey: 3, InstrumentType: 'Kocher Hemostat',             UnitPrice: 4.80, TotalCount: 1, RepairedCount: 1, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 13, TrayKey: 4, InstrumentType: 'Babcock Forceps',             UnitPrice: 5.50, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 14, TrayKey: 4, InstrumentType: 'Richardson Retractor',        UnitPrice: 9.80, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 15, TrayKey: 4, InstrumentType: 'Crile Hemostat - Straight',   UnitPrice: 4.20, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 16, TrayKey: 5, InstrumentType: 'Allis Clamp',                 UnitPrice: 5.20, TotalCount: 3, RepairedCount: 2, SentToTSICount: 1, BERCount: 0 },
  { ItemKey: 17, TrayKey: 5, InstrumentType: 'Mayo-Hegar Needle Holder',    UnitPrice: 8.86, TotalCount: 3, RepairedCount: 1, SentToTSICount: 2, BERCount: 0 },
  { ItemKey: 18, TrayKey: 5, InstrumentType: 'Curved Metzenbaum Scissors',  UnitPrice: 9.20, TotalCount: 2, RepairedCount: 1, SentToTSICount: 0, BERCount: 1 },
  { ItemKey: 19, TrayKey: 5, InstrumentType: 'Kelly Hemostat - Curved',     UnitPrice: 4.40, TotalCount: 1, RepairedCount: 1, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 20, TrayKey: 6, InstrumentType: 'DeBakey Forceps - 8"',        UnitPrice: 7.40, TotalCount: 4, RepairedCount: 4, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 21, TrayKey: 6, InstrumentType: 'Crile Hemostat - Curved',     UnitPrice: 4.20, TotalCount: 3, RepairedCount: 3, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 22, TrayKey: 6, InstrumentType: 'Mayo-Hegar Needle Holder',    UnitPrice: 8.86, TotalCount: 3, RepairedCount: 2, SentToTSICount: 1, BERCount: 0 },
  { ItemKey: 23, TrayKey: 6, InstrumentType: 'Curved Mayo Scissors',        UnitPrice: 7.50, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 24, TrayKey: 6, InstrumentType: 'Halsted Mosquito - Straight', UnitPrice: 3.60, TotalCount: 2, RepairedCount: 1, SentToTSICount: 1, BERCount: 0 },
  { ItemKey: 25, TrayKey: 7, InstrumentType: 'Metzenbaum Scissors - Straight', UnitPrice: 9.20, TotalCount: 3, RepairedCount: 3, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 26, TrayKey: 7, InstrumentType: 'Needle Holder - 7"',          UnitPrice: 9.40, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 27, TrayKey: 7, InstrumentType: 'Kocher Hemostat',             UnitPrice: 4.80, TotalCount: 3, RepairedCount: 2, SentToTSICount: 1, BERCount: 0 },
  { ItemKey: 28, TrayKey: 7, InstrumentType: 'Right Angle Clamp',           UnitPrice: 6.50, TotalCount: 2, RepairedCount: 2, SentToTSICount: 0, BERCount: 0 },
  { ItemKey: 29, TrayKey: 7, InstrumentType: 'Plain Thumb Forceps',         UnitPrice: 3.80, TotalCount: 1, RepairedCount: 1, SentToTSICount: 0, BERCount: 0 },
];

let documents = [];

let trayTemplates = [
  { TemplateKey: 1, ClientKey: 3785, DepartmentKey: 9360, TrayName: 'GI Tray A', Items: [
    { InstrumentType: 'Crile Hemostat - Curved',    UnitPrice: 4.20, DefaultCount: 3 },
    { InstrumentType: 'Mayo-Hegar Needle Holder',   UnitPrice: 8.86, DefaultCount: 4 },
    { InstrumentType: 'Curved Metzenbaum Scissors', UnitPrice: 9.20, DefaultCount: 3 },
    { InstrumentType: 'Kelly Hemostat - Curved',    UnitPrice: 4.40, DefaultCount: 2 },
  ]},
  { TemplateKey: 2, ClientKey: 3785, DepartmentKey: 9360, TrayName: 'GI Tray B', Items: [
    { InstrumentType: 'Halsted Mosquito - Curved',  UnitPrice: 3.60, DefaultCount: 4 },
    { InstrumentType: 'Allis Tissue Forceps',       UnitPrice: 5.20, DefaultCount: 3 },
    { InstrumentType: 'DeBakey Forceps - 6"',       UnitPrice: 6.80, DefaultCount: 2 },
    { InstrumentType: 'Sponge Forceps',             UnitPrice: 5.60, DefaultCount: 1 },
  ]},
  { TemplateKey: 3, ClientKey: 3544, DepartmentKey: 9361, TrayName: 'Scope Tray 1', Items: [
    { InstrumentType: 'Needle Holder - 6"',         UnitPrice: 8.86, DefaultCount: 3 },
    { InstrumentType: 'Curved Mayo Scissors',       UnitPrice: 7.50, DefaultCount: 2 },
    { InstrumentType: 'Kelly Hemostat - Straight',  UnitPrice: 4.40, DefaultCount: 2 },
    { InstrumentType: 'Kocher Hemostat',            UnitPrice: 4.80, DefaultCount: 1 },
  ]},
  { TemplateKey: 4, ClientKey: 3544, DepartmentKey: 9361, TrayName: 'OR Tray A', Items: [
    { InstrumentType: 'DeBakey Forceps - 8"',        UnitPrice: 7.40, DefaultCount: 4 },
    { InstrumentType: 'Crile Hemostat - Curved',     UnitPrice: 4.20, DefaultCount: 3 },
    { InstrumentType: 'Mayo-Hegar Needle Holder',    UnitPrice: 8.86, DefaultCount: 3 },
    { InstrumentType: 'Curved Mayo Scissors',        UnitPrice: 7.50, DefaultCount: 2 },
    { InstrumentType: 'Halsted Mosquito - Straight', UnitPrice: 3.60, DefaultCount: 2 },
  ]},
  { TemplateKey: 5, ClientKey: 3544, DepartmentKey: 9361, TrayName: 'OR Tray B', Items: [
    { InstrumentType: 'Metzenbaum Scissors - Straight', UnitPrice: 9.20, DefaultCount: 3 },
    { InstrumentType: 'Needle Holder - 7"',          UnitPrice: 9.40, DefaultCount: 2 },
    { InstrumentType: 'Kocher Hemostat',             UnitPrice: 4.80, DefaultCount: 3 },
    { InstrumentType: 'Right Angle Clamp',           UnitPrice: 6.50, DefaultCount: 2 },
    { InstrumentType: 'Plain Thumb Forceps',         UnitPrice: 3.80, DefaultCount: 1 },
  ]},
];

let nextKey = 300;

// ── ROUTES ───────────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => res.json({ status: 'ok', mode: 'mock', time: new Date() }));
app.get('/api/technicians', (req, res) => res.json(technicians));
app.get('/api/clients', (req, res) => res.json(clients));
app.get('/api/instrument-types', (req, res) => res.json(instrumentTypes));

app.get('/api/departments', (req, res) => {
  const clientId = parseInt(req.query.clientId);
  res.json(clientId ? departments.filter(d => d.ClientKey === clientId) : departments);
});

app.get('/api/calendar-events', (req, res) => {
  const month = parseInt(req.query.month);
  const year  = parseInt(req.query.year);
  res.json(calendarEvents.filter(e => {
    const d = new Date(e.EventDate);
    return d.getMonth() + 1 === month && d.getFullYear() === year;
  }));
});
app.post('/api/calendar-events', (req, res) => {
  const ev = { ...req.body, EventKey: nextKey++ };
  calendarEvents.push(ev);
  res.status(201).json(ev);
});
app.put('/api/calendar-events/:id', (req, res) => {
  const idx = calendarEvents.findIndex(e => e.EventKey === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  calendarEvents[idx] = { ...calendarEvents[idx], ...req.body };
  res.json(calendarEvents[idx]);
});
app.delete('/api/calendar-events/:id', (req, res) => {
  const idx = calendarEvents.findIndex(e => e.EventKey === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  calendarEvents.splice(idx, 1);
  res.json({ success: true });
});

app.get('/api/site-services', (req, res) => {
  let list = [...siteServices];
  if (req.query.technicianId) list = list.filter(s => s.TechnicianKey === parseInt(req.query.technicianId));
  if (req.query.clientId)     list = list.filter(s => s.ClientKey     === parseInt(req.query.clientId));
  if (req.query.status)       list = list.filter(s => s.Status        === req.query.status);
  res.json(list);
});
app.get('/api/site-services/:id', (req, res) => {
  res.json(siteServices.find(x => x.SiteServiceKey === parseInt(req.params.id)) || null);
});
app.post('/api/site-services', (req, res) => {
  const s = { ...req.body, SiteServiceKey: nextKey++, Status: 'draft', DateSubmitted: null };
  siteServices.push(s);
  res.status(201).json(s);
});
app.patch('/api/site-services/:id', (req, res) => {
  const idx = siteServices.findIndex(s => s.SiteServiceKey === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  siteServices[idx] = { ...siteServices[idx], ...req.body };
  res.json(siteServices[idx]);
});

// Trays
app.get('/api/site-services/:id/trays', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(trays.filter(t => t.SiteServiceKey === id).map(t => ({ ...t, Items: trayItems.filter(i => i.TrayKey === t.TrayKey) })));
});
app.post('/api/site-services/:id/trays', (req, res) => {
  const svcId = parseInt(req.params.id);
  const tray = { TrayKey: nextKey++, SiteServiceKey: svcId, TrayName: req.body.TrayName || 'New Tray', AdHoc: req.body.AdHoc || false };
  trays.push(tray);
  if (req.body.TemplateKey) {
    const tmpl = trayTemplates.find(t => t.TemplateKey === parseInt(req.body.TemplateKey));
    if (tmpl) tmpl.Items.forEach(ti => trayItems.push({ ItemKey: nextKey++, TrayKey: tray.TrayKey, InstrumentType: ti.InstrumentType, UnitPrice: ti.UnitPrice, TotalCount: ti.DefaultCount, RepairedCount: 0, SentToTSICount: 0, BERCount: 0 }));
  }
  const svc = siteServices.find(s => s.SiteServiceKey === svcId);
  if (svc) svc.TrayCount = trays.filter(t => t.SiteServiceKey === svcId).length;
  res.status(201).json({ ...tray, Items: trayItems.filter(i => i.TrayKey === tray.TrayKey) });
});
app.patch('/api/site-services/:id/trays/:trayId', (req, res) => {
  const idx = trays.findIndex(t => t.TrayKey === parseInt(req.params.trayId));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (req.body.TrayName) trays[idx].TrayName = req.body.TrayName;
  res.json({ ...trays[idx], Items: trayItems.filter(i => i.TrayKey === trays[idx].TrayKey) });
});
app.delete('/api/site-services/:id/trays/:trayId', (req, res) => {
  const svcId = parseInt(req.params.id);
  const trayId = parseInt(req.params.trayId);
  const trayIdx = trays.findIndex(t => t.TrayKey === trayId);
  if (trayIdx === -1) return res.status(404).json({ error: 'Not found' });
  trays.splice(trayIdx, 1);
  for (let i = trayItems.length - 1; i >= 0; i--) { if (trayItems[i].TrayKey === trayId) trayItems.splice(i, 1); }
  const svc = siteServices.find(s => s.SiteServiceKey === svcId);
  if (svc) svc.TrayCount = trays.filter(t => t.SiteServiceKey === svcId).length;
  res.json({ success: true });
});

// Tray Items
app.post('/api/site-services/:id/trays/:trayId/items', (req, res) => {
  const trayId = parseInt(req.params.trayId);
  if (!trays.find(t => t.TrayKey === trayId)) return res.status(404).json({ error: 'Tray not found' });
  const item = { ItemKey: nextKey++, TrayKey: trayId, InstrumentType: req.body.InstrumentType, UnitPrice: req.body.UnitPrice || 0, TotalCount: req.body.TotalCount || 0, RepairedCount: 0, SentToTSICount: 0, BERCount: 0 };
  trayItems.push(item);
  res.status(201).json(item);
});
app.patch('/api/site-services/:id/trays/:trayId/items/:itemId', (req, res) => {
  const idx = trayItems.findIndex(i => i.ItemKey === parseInt(req.params.itemId));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ['TotalCount','RepairedCount','SentToTSICount','BERCount'].forEach(f => { if (req.body[f] !== undefined) trayItems[idx][f] = req.body[f]; });
  res.json(trayItems[idx]);
});
app.delete('/api/site-services/:id/trays/:trayId/items/:itemId', (req, res) => {
  const idx = trayItems.findIndex(i => i.ItemKey === parseInt(req.params.itemId));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  trayItems.splice(idx, 1);
  res.json({ success: true });
});

// Documents
app.get('/api/site-services/:id/documents', (req, res) => {
  res.json(documents.filter(d => d.SiteServiceKey === parseInt(req.params.id)).map(({ DataUrl, ...rest }) => rest));
});
app.get('/api/site-services/:id/documents/:docId/data', (req, res) => {
  const doc = documents.find(d => d.DocKey === parseInt(req.params.docId));
  if (!doc) return res.status(404).end();
  res.set('Content-Type', doc.MimeType);
  res.send(Buffer.from(doc.DataUrl.replace(/^data:[^;]+;base64,/, ''), 'base64'));
});
app.post('/api/site-services/:id/documents', (req, res) => {
  const { FileName, MimeType, DataUrl, TechKey } = req.body;
  if (!DataUrl) return res.status(400).json({ error: 'DataUrl required' });
  const doc = { DocKey: nextKey++, SiteServiceKey: parseInt(req.params.id), FileName: FileName || 'photo.jpg', MimeType: MimeType || 'image/jpeg', DataUrl, TechKey: TechKey || null, Size: Math.round(DataUrl.length * 0.75), UploadedAt: new Date().toISOString() };
  documents.push(doc);
  const { DataUrl: _omit, ...meta } = doc;
  res.status(201).json(meta);
});
app.delete('/api/site-services/:id/documents/:docId', (req, res) => {
  const idx = documents.findIndex(d => d.DocKey === parseInt(req.params.docId));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  documents.splice(idx, 1);
  res.json({ success: true });
});

// Tray Templates
app.get('/api/tray-templates', (req, res) => {
  const clientId = parseInt(req.query.clientId);
  const deptId   = parseInt(req.query.deptId);
  if (!clientId || !deptId) return res.status(400).json({ error: 'clientId and deptId required' });
  res.json(trayTemplates.filter(t => t.ClientKey === clientId && t.DepartmentKey === deptId));
});
app.post('/api/tray-templates', (req, res) => {
  const { ClientKey, DepartmentKey, TrayName, Items } = req.body;
  if (!ClientKey || !DepartmentKey || !TrayName) return res.status(400).json({ error: 'ClientKey, DepartmentKey, TrayName required' });
  const tmpl = { TemplateKey: nextKey++, ClientKey, DepartmentKey, TrayName, Items: Items || [] };
  trayTemplates.push(tmpl);
  res.status(201).json(tmpl);
});
app.put('/api/tray-templates/:id', (req, res) => {
  const idx = trayTemplates.findIndex(t => t.TemplateKey === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (req.body.TrayName) trayTemplates[idx].TrayName = req.body.TrayName;
  if (req.body.Items)    trayTemplates[idx].Items    = req.body.Items;
  res.json(trayTemplates[idx]);
});
app.delete('/api/tray-templates/:id', (req, res) => {
  const idx = trayTemplates.findIndex(t => t.TemplateKey === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  trayTemplates.splice(idx, 1);
  res.json({ success: true });
});

module.exports = app;
