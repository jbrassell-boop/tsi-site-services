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
  { Code: 'Adenotome',                                  Price:  6.16 },
  { Code: 'Arthroscopy Grasper',                        Price: 23.40 },
  { Code: 'Arthroscopy Punch',                          Price: 35.17 },
  { Code: 'Arthroscopy Scissor',                        Price: 34.09 },
  { Code: 'Aspirating/Biopsy Needle',                   Price: 20.24 },
  { Code: 'Awl',                                        Price:  4.11 },
  { Code: 'Basic Inspection',                           Price: 50.00 },
  { Code: 'Biopsy Punch',                               Price: 18.98 },
  { Code: 'Biopsy Punch - Cervical',                    Price: 21.76 },
  { Code: 'Bone Chisel',                                Price:  6.16 },
  { Code: 'Bone Cutter',                                Price: 22.14 },
  { Code: 'Bone Hook',                                  Price:  7.59 },
  { Code: 'Bone Tamp',                                  Price:  7.59 },
  { Code: 'Caliper',                                    Price:  4.11 },
  { Code: 'Chisel',                                     Price:  6.33 },
  { Code: 'Chuck',                                      Price: 44.28 },
  { Code: 'Clamp - Bulldog',                            Price:  7.59 },
  { Code: 'Clamp - Hemo, Kelly, Allis, Peon, Crile',   Price:  5.06 },
  { Code: 'Clamp - Vascular',                           Price:  6.96 },
  { Code: 'Clip Applier',                               Price:  8.86 },
  { Code: 'Cobb Elevator',                              Price:  8.59 },
  { Code: 'Comprehensive Inspection',                   Price: 150.00 },
  { Code: 'Container Bottom',                           Price: 50.09 },
  { Code: 'Container Handle Replace - Genesis Brand',   Price: 70.71 },
  { Code: 'Container Latch Replace - Aesculap Brand',   Price: 119.54 },
  { Code: 'Container Latch Replace - Genesis Brand',    Price: 81.59 },
  { Code: 'Container Lid',                              Price: 52.75 },
  { Code: 'Container Retention Plate',                  Price:  9.17 },
  { Code: 'Curette',                                    Price:  6.20 },
  { Code: 'Curette - Micro',                            Price: 10.82 },
  { Code: 'Curette - Ring',                             Price:  9.66 },
  { Code: 'Diamond Dusting',                            Price: 69.58 },
  { Code: 'Dilator',                                    Price:  6.96 },
  { Code: 'Dissector',                                  Price:  4.11 },
  { Code: 'Double Action Rongeur',                      Price: 27.07 },
  { Code: 'Drill Bit',                                  Price:  6.20 },
  { Code: 'Elevator',                                   Price:  8.16 },
  { Code: 'Elevator - Freer/Dual Head',                 Price: 11.92 },
  { Code: 'Elevator - Micro',                           Price:  8.22 },
  { Code: 'Forcep - Bipolar',                           Price:  6.70 },
  { Code: 'Forcep - General',                           Price:  4.43 },
  { Code: 'Forcep - Micro, Jeweler',                    Price:  8.22 },
  { Code: 'Forcep - Titanium',                          Price:  8.63 },
  { Code: 'Gouge',                                      Price:  6.16 },
  { Code: 'Knife',                                      Price:  8.22 },
  { Code: 'Knife - Amputation',                         Price: 10.12 },
  { Code: 'Knife - Micro',                              Price: 12.32 },
  { Code: 'Knife Handle',                               Price:  3.29 },
  { Code: 'Lap - Disassemble, Reinsulate Shaft, Reassemble', Price: 69.58 },
  { Code: 'Lap - Full Rebuild',                         Price: 120.81 },
  { Code: 'Lap - Minor Repair',                         Price: 57.56 },
  { Code: 'Lap - Scissor',                              Price: 18.34 },
  { Code: 'Mallet',                                     Price:  9.49 },
  { Code: 'Manipulator',                                Price:  7.87 },
  { Code: 'Manipulator - Micro',                        Price: 12.32 },
  { Code: 'Misc. Labor (Half Hour)',                    Price: 56.93 },
  { Code: 'Mouth Gag',                                  Price: 10.12 },
  { Code: 'Nail Clipper',                               Price: 18.98 },
  { Code: 'Needle Holder',                              Price:  8.86 },
  { Code: 'Needle Holder - Micro',                      Price: 11.39 },
  { Code: 'Needle Holder/Scissor Combo',                Price:  7.59 },
  { Code: 'Osteotome',                                  Price:  6.62 },
  { Code: 'Pick',                                       Price:  6.33 },
  { Code: 'Pick - Micro',                               Price: 12.40 },
  { Code: 'Pin Cutter',                                 Price: 20.24 },
  { Code: 'Pin Cutter - Large',                         Price: 26.69 },
  { Code: 'Plier',                                      Price:  6.96 },
  { Code: 'Probe',                                      Price:  8.22 },
  { Code: 'Rasp',                                       Price:  7.59 },
  { Code: 'Reamer',                                     Price:  8.86 },
  { Code: 'Reamer - Acetabular',                        Price: 25.30 },
  { Code: 'Retractor - Bookwalter Blades',              Price: 10.71 },
  { Code: 'Retractor - Double Ended',                   Price:  7.00 },
  { Code: 'Retractor - Hand Held',                      Price:  5.69 },
  { Code: 'Retractor - Opthalmic/Eye',                  Price: 18.98 },
  { Code: 'Retractor - Self Retaining',                 Price: 14.55 },
  { Code: 'Rib Sheer',                                  Price: 20.87 },
  { Code: 'Rongeur',                                    Price: 23.66 },
  { Code: 'Rongeur - Kerrison',                         Price: 28.46 },
  { Code: 'Rongeur - Pituitary',                        Price: 27.07 },
  { Code: 'Scissors - General, Curved',                 Price:  6.33 },
  { Code: 'Scissors - Micro',                           Price: 17.08 },
  { Code: 'Scissors - Oversized (10 and up)',           Price:  7.39 },
  { Code: 'Scissors - Potts, Delicate',                 Price:  8.22 },
  { Code: 'Scissors - Serrated, Supercut',              Price: 10.12 },
  { Code: 'Scissors - TC',                              Price: 19.02 },
  { Code: 'Sheath',                                     Price:  9.74 },
  { Code: 'Single Action Rongeur',                      Price: 27.07 },
  { Code: 'Skin Hook',                                  Price:  5.69 },
  { Code: 'Skin Hook - Micro',                          Price:  9.68 },
  { Code: 'Skin Rakes',                                 Price:  5.69 },
  { Code: 'Snare',                                      Price:  8.86 },
  { Code: 'Snare - Tonsil',                             Price:  8.86 },
  { Code: 'Speculum',                                   Price:  6.96 },
  { Code: 'Speculum - Eye, Wire',                       Price: 10.27 },
  { Code: 'Speculum - GYN',                             Price:  9.29 },
  { Code: 'Speculum - Nasal',                           Price:  7.97 },
  { Code: 'Standard Inspection',                        Price: 100.00 },
  { Code: 'Stringer',                                   Price:  4.43 },
  { Code: 'Stylett',                                    Price:  6.54 },
  { Code: 'Suction Tube',                               Price:  6.96 },
  { Code: 'Suction Tube W/ Needle',                     Price:  9.49 },
  { Code: 'Suture Passer',                              Price:  8.98 },
  { Code: 'Taping - Per Piece',                         Price:  1.27 },
  { Code: 'Total Curette',                              Price: 15.00 },
  { Code: 'Trocar',                                     Price:  8.86 },
  { Code: 'Verres Needle',                              Price: 30.82 },
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
app.delete('/api/calendar-events/series/:seriesId', (req, res) => {
  const seriesId = parseInt(req.params.seriesId);
  const fromDate = req.query.from;
  let removed = 0;
  for (let i = calendarEvents.length - 1; i >= 0; i--) {
    if (calendarEvents[i].SeriesId === seriesId && calendarEvents[i].EventDate >= fromDate) {
      calendarEvents.splice(i, 1);
      removed++;
    }
  }
  res.json({ success: true, removed });
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

app.delete('/api/site-services/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = siteServices.findIndex(s => s.SiteServiceKey === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (siteServices[idx].Status === 'submitted') return res.status(400).json({ error: 'Cannot delete a submitted service' });
  // Remove associated trays, items, and documents
  const trayKeys = trays.filter(t => t.SiteServiceKey === id).map(t => t.TrayKey);
  trayKeys.forEach(tk => { for (let i = trayItems.length - 1; i >= 0; i--) if (trayItems[i].TrayKey === tk) trayItems.splice(i, 1); });
  for (let i = trays.length - 1; i >= 0; i--) if (trays[i].SiteServiceKey === id) trays.splice(i, 1);
  for (let i = documents.length - 1; i >= 0; i--) if (documents[i].SiteServiceKey === id) documents.splice(i, 1);
  siteServices.splice(idx, 1);
  res.json({ ok: true });
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
  const item = { ItemKey: nextKey++, TrayKey: trayId, InstrumentType: req.body.InstrumentType, UnitPrice: req.body.UnitPrice || 0, TotalCount: req.body.TotalCount || 1, RepairedCount: 0, SentToTSICount: 0, BERCount: 0 };
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

// ── REPORTS ──────────────────────────────────────────────────────────────────

app.get('/api/reports/tray-gap', (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const trayMap = new Map();

  trays.forEach(tray => {
    const svc = siteServices.find(s => s.SiteServiceKey === tray.SiteServiceKey);
    if (!svc) return;
    const key = `${svc.ClientKey}|${svc.DepartmentKey}|${tray.TrayName}`;
    const existing = trayMap.get(key);
    if (!existing || svc.OnsiteDate > existing.LastVisit) {
      trayMap.set(key, {
        ClientKey: svc.ClientKey, ClientName: svc.ClientName,
        DepartmentKey: svc.DepartmentKey, DepartmentName: svc.DepartmentName,
        TrayName: tray.TrayName, LastVisit: svc.OnsiteDate, TechnicianName: svc.TechnicianName,
      });
    }
  });

  trayTemplates.forEach(tmpl => {
    const key = `${tmpl.ClientKey}|${tmpl.DepartmentKey}|${tmpl.TrayName}`;
    if (!trayMap.has(key)) {
      const client = clients.find(c => c.ClientKey === tmpl.ClientKey);
      const dept = departments.find(d => d.DepartmentKey === tmpl.DepartmentKey);
      trayMap.set(key, {
        ClientKey: tmpl.ClientKey, ClientName: client ? client.ClientName : '—',
        DepartmentKey: tmpl.DepartmentKey, DepartmentName: dept ? dept.DepartmentName : '—',
        TrayName: tmpl.TrayName, LastVisit: null, TechnicianName: null,
      });
    }
  });

  const rows = [...trayMap.values()].map(r => {
    const daysSince = r.LastVisit
      ? Math.floor((today - new Date(r.LastVisit + 'T00:00:00')) / 86400000)
      : 9999;
    return { ...r, DaysSince: daysSince };
  }).sort((a, b) => b.DaysSince - a.DaysSince);

  res.json(rows);
});

app.get('/api/reports/customer-value', (req, res) => {
  const clientId = parseInt(req.query.clientId);
  if (!clientId) return res.status(400).json({ error: 'clientId required' });

  const clientSvcs = siteServices
    .filter(s => s.ClientKey === clientId && s.Status === 'submitted')
    .sort((a, b) => a.OnsiteDate.localeCompare(b.OnsiteDate));

  let totInstr = 0, totRep = 0, totBER = 0, totSent = 0, totValue = 0;

  const visits = clientSvcs.map(svc => {
    const svcTrays = trays.filter(t => t.SiteServiceKey === svc.SiteServiceKey);
    const svcItems = svcTrays.flatMap(t => trayItems.filter(i => i.TrayKey === t.TrayKey));
    let vInstr = 0, vRep = 0, vBER = 0, vSent = 0, vValue = 0;
    svcItems.forEach(i => {
      vInstr += i.TotalCount; vRep += i.RepairedCount;
      vBER += i.BERCount; vSent += i.SentToTSICount;
      vValue += i.RepairedCount * i.UnitPrice;
    });
    totInstr += vInstr; totRep += vRep; totBER += vBER; totSent += vSent; totValue += vValue;
    return {
      SiteServiceKey: svc.SiteServiceKey, OnsiteDate: svc.OnsiteDate,
      DepartmentName: svc.DepartmentName, TechnicianName: svc.TechnicianName,
      TrayCount: svcTrays.length, TotalInstruments: vInstr, TotalRepaired: vRep, Value: vValue,
    };
  });

  res.json({
    ClientKey: clientId,
    ClientName: clients.find(c => c.ClientKey === clientId)?.ClientName || '—',
    kpis: { TotalVisits: clientSvcs.length, TotalInstruments: totInstr, TotalRepaired: totRep, TotalBER: totBER, TotalSentToTSI: totSent, TotalValue: totValue },
    visits,
  });
});

app.get('/api/reports/instrument-recurrence', (req, res) => {
  // Map: clientKey|instrumentType -> { ClientName, InstrumentType, berCount, sentCount, visitCount, lastSeen }
  const map = new Map();
  trayItems.forEach(item => {
    if (item.BERCount === 0 && item.SentToTSICount === 0) return;
    const tray = trays.find(t => t.TrayKey === item.TrayKey);
    if (!tray) return;
    const svc = siteServices.find(s => s.SiteServiceKey === tray.SiteServiceKey);
    if (!svc) return;
    const key = `${svc.ClientKey}|${item.InstrumentType}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ClientKey: svc.ClientKey, ClientName: svc.ClientName, InstrumentType: item.InstrumentType, BERCount: item.BERCount, SentToTSICount: item.SentToTSICount, VisitCount: 1, LastSeen: svc.OnsiteDate });
    } else {
      existing.BERCount += item.BERCount;
      existing.SentToTSICount += item.SentToTSICount;
      existing.VisitCount += 1;
      if (svc.OnsiteDate > existing.LastSeen) existing.LastSeen = svc.OnsiteDate;
    }
  });
  const rows = [...map.values()]
    .map(r => ({ ...r, TotalFlags: r.BERCount + r.SentToTSICount }))
    .sort((a, b) => b.TotalFlags - a.TotalFlags);
  res.json(rows);
});

app.get('/api/reports/visit-frequency', (req, res) => {
  const map = new Map();
  calendarEvents.forEach(ev => {
    const key = ev.ClientKey;
    if (!map.has(key)) map.set(key, { ClientKey: ev.ClientKey, ClientName: ev.ClientName, Scheduled: 0, Completed: 0 });
    map.get(key).Scheduled += 1;
  });
  siteServices.filter(s => s.Status === 'submitted').forEach(s => {
    if (!map.has(s.ClientKey)) map.set(s.ClientKey, { ClientKey: s.ClientKey, ClientName: s.ClientName, Scheduled: 0, Completed: 0 });
    map.get(s.ClientKey).Completed += 1;
  });
  const rows = [...map.values()].map(r => ({
    ...r,
    CompletionRate: r.Scheduled > 0 ? Math.round(r.Completed / r.Scheduled * 100) : (r.Completed > 0 ? 100 : 0)
  })).sort((a, b) => a.CompletionRate - b.CompletionRate);
  res.json(rows);
});

app.get('/api/reports/repair-rates', (req, res) => {
  const map = new Map();
  siteServices.filter(s => s.Status === 'submitted').forEach(svc => {
    if (!map.has(svc.ClientKey)) map.set(svc.ClientKey, { ClientKey: svc.ClientKey, ClientName: svc.ClientName, TotalInstr: 0, TotalRepaired: 0, TotalBER: 0, TotalSent: 0, Visits: 0 });
    const entry = map.get(svc.ClientKey);
    entry.Visits += 1;
    const svcTrays = trays.filter(t => t.SiteServiceKey === svc.SiteServiceKey);
    svcTrays.forEach(tray => {
      trayItems.filter(i => i.TrayKey === tray.TrayKey).forEach(i => {
        entry.TotalInstr += i.TotalCount;
        entry.TotalRepaired += i.RepairedCount;
        entry.TotalBER += i.BERCount;
        entry.TotalSent += i.SentToTSICount;
      });
    });
  });
  const rows = [...map.values()].map(r => ({
    ...r,
    RepairRate: r.TotalInstr > 0 ? Math.round(r.TotalRepaired / r.TotalInstr * 100) : 0,
    BERRate: r.TotalInstr > 0 ? Math.round(r.TotalBER / r.TotalInstr * 100) : 0,
    SentRate: r.TotalInstr > 0 ? Math.round(r.TotalSent / r.TotalInstr * 100) : 0,
  })).sort((a, b) => b.BERRate - a.BERRate);
  res.json(rows);
});

app.get('/api/reports/tech-productivity', (req, res) => {
  const map = new Map();
  siteServices.filter(s => s.Status === 'submitted').forEach(svc => {
    if (!map.has(svc.TechnicianKey)) map.set(svc.TechnicianKey, { TechnicianKey: svc.TechnicianKey, TechnicianName: svc.TechnicianName, Visits: 0, Instruments: 0, Repaired: 0, Value: 0 });
    const entry = map.get(svc.TechnicianKey);
    entry.Visits += 1;
    const svcTrays = trays.filter(t => t.SiteServiceKey === svc.SiteServiceKey);
    svcTrays.forEach(tray => {
      trayItems.filter(i => i.TrayKey === tray.TrayKey).forEach(i => {
        entry.Instruments += i.TotalCount;
        entry.Repaired += i.RepairedCount;
        entry.Value += i.RepairedCount * i.UnitPrice;
      });
    });
  });
  const rows = [...map.values()].map(r => ({
    ...r,
    AvgPerVisit: r.Visits > 0 ? Math.round(r.Instruments / r.Visits) : 0,
  })).sort((a, b) => b.Value - a.Value);
  res.json(rows);
});

app.get('/api/reports/tray-inventory', (req, res) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const trayMap = new Map();

  trays.forEach(tray => {
    const svc = siteServices.find(s => s.SiteServiceKey === tray.SiteServiceKey);
    if (!svc) return;
    const key = `${svc.ClientKey}|${svc.DepartmentKey}|${tray.TrayName}`;
    const items = trayItems.filter(i => i.TrayKey === tray.TrayKey);
    const instrCount = items.reduce((s, i) => s + i.TotalCount, 0);
    const existing = trayMap.get(key);
    if (!existing || svc.OnsiteDate > existing.LastVisit) {
      trayMap.set(key, {
        ClientKey: svc.ClientKey, ClientName: svc.ClientName,
        DepartmentKey: svc.DepartmentKey, DepartmentName: svc.DepartmentName,
        TrayName: tray.TrayName, LastVisit: svc.OnsiteDate,
        TechnicianName: svc.TechnicianName, InstrumentCount: instrCount,
      });
    }
  });

  // Also seed from templates for trays never visited
  trayTemplates.forEach(tmpl => {
    const key = `${tmpl.ClientKey}|${tmpl.DepartmentKey}|${tmpl.TrayName}`;
    if (!trayMap.has(key)) {
      const client = clients.find(c => c.ClientKey === tmpl.ClientKey);
      const dept = departments.find(d => d.DepartmentKey === tmpl.DepartmentKey);
      trayMap.set(key, {
        ClientKey: tmpl.ClientKey, ClientName: client ? client.ClientName : '—',
        DepartmentKey: tmpl.DepartmentKey, DepartmentName: dept ? dept.DepartmentName : '—',
        TrayName: tmpl.TrayName, LastVisit: null, TechnicianName: null,
        InstrumentCount: (tmpl.Items || []).reduce((s, i) => s + (i.DefaultCount || 0), 0),
      });
    }
  });

  const rows = [...trayMap.values()].map(r => ({
    ...r,
    DaysSince: r.LastVisit ? Math.floor((today - new Date(r.LastVisit + 'T00:00:00')) / 86400000) : 9999,
  })).sort((a, b) => a.ClientName.localeCompare(b.ClientName) || a.TrayName.localeCompare(b.TrayName));

  // Group by client for the response
  const grouped = [];
  const seen = new Map();
  rows.forEach(r => {
    if (!seen.has(r.ClientKey)) {
      seen.set(r.ClientKey, { ClientKey: r.ClientKey, ClientName: r.ClientName, Trays: [] });
      grouped.push(seen.get(r.ClientKey));
    }
    seen.get(r.ClientKey).Trays.push(r);
  });

  res.json(grouped);
});

module.exports = app;
