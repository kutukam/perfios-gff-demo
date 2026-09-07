/* ============================================================
   Every string and number below is transcribed from the Figma
   frames — including the typos, which are preserved verbatim so
   the render matches the source ("yur Location", "don not press",
   "can very in case", "late Payment Fee", "Deposite Account").
   ============================================================ */

export const applicant = {
  name: "Vikas Kumar",
  mobileLabel: "Mobile Number",
  otpLabel: "Enter OTP",
  otp: "756283" /* FROM-EXPORT */,
  mobile: "+91 8094671628",
  /* What a customer actually types into the box. The frames show the number
     with its country code, but the field itself takes ten digits — and the
     co-browse page model judges the entry against that expected shape, so
     filling it with the display string reads as half-typed. */
  mobileEntry: "8094671628",
  pan: "SDRFG0289F",
  panLabel: "PAN (Eg. KBGTS79812M) *",
  aadhaarTail: "3789",
  aadhaarFull: "342578473789",
};

/* Offer screen — 6031:15795 */
export const offer = {
  headline:
    "Congratulations! You have received a personal loan offer of ₹2,00,000",
  rows: [
    { label: "In-principle Amount", value: "₹2,00,000", tone: "primary" },
    {
      label: "Loan Tenure",
      value: "84 Months ",
      note: "(7 Yrs)",
      tone: "default",
    },
    { label: "Monthly EMI Amount", value: "₹4,145", tone: "default" },
  ],
  footnote:
    "* Values may vary based on detailed assessment after submission of documents",
};

/* Offer / new — top-up vs new application, 6031:17013 & 6031:17039 */
export const topUp = {
  title: "We found an existing loan",
  optionTopUp: "Top Up this to your existing 5L loan",
  optionNew: "Create a new loan application",
  footnote:
    "* Continuing as a top up will update your existing loan amount and monthly EMI",
};

/* Existing loan info sheet — 6280:30863 */
export const existingLoan = {
  title: "Existing loan info",
  rows: [
    { label: "Loan Provider", value: "Acme Bank", bankLogo: true },
    { label: "Loan Amount", value: "₹ 5,00,000" },
    { label: "Current Outstanding", value: "₹ 3,84,006" },
    { label: "EMI", value: "₹ 5,800" },
    { label: "Loan Tenure", value: "84 Months (7 Years)" },
    { label: "late Payment Fee", value: "0.25%" },
    { label: "Loan Taken on", value: "13 / 03 / 2021" },
  ],
  footnote:
    "These fees and charges are subject to change based on time and loan amount**",
};

/* Key Fact Statement — 6031:16209 */
export const kfs = {
  title: "Key Fact Statement",
  sub: "Please review your loan key fact statement",
  groups: [
    [{ label: "Loan Amount", value: "₹5,00,000", tone: "green" }],
    [
      {
        label: "Total Repayable Amount",
        value: "₹6,51,693",
        tone: "strongDark",
      },
      {
        label: "Net Disbursed Amount",
        value: "₹1,96,500",
        tone: "muted",
        indent: true,
      },
      {
        label: "Total Interest Payable",
        value: "₹5,18,677",
        tone: "muted",
        indent: true,
      },
    ],
    [
      { label: "Upfront Charges", value: "₹3,500", tone: "strongDark" },
      { label: "Processing Fee", value: "₹1,500", tone: "muted", indent: true },
      { label: "Insurance Fee", value: "₹1,500", tone: "muted", indent: true },
      { label: "Other Fee", value: "₹500", tone: "muted", indent: true },
    ],
    [
      { label: "EMI Amount", value: "₹4,145", tone: "strongDark" },
      {
        label: "Loan Tenure",
        value: "84 Months",
        note: "(7Yrs)",
        tone: "strongDark",
      },
      { label: "APR ", value: "17.5%", tone: "strongDark" },
      { label: "No. of Installments", value: "84", tone: "muted" },
      { label: "Repayment Frequency", value: "Monthly", tone: "muted" },
    ],
    [{ label: "Cooling off/look-up period", value: "7 Days", tone: "muted" }],
  ],
  stacked: [
    {
      label: "Rate of annualized penal charges for delay",
      value: "2.5% of outstanding amount",
    },
    {
      label: "Rate of any other penal charges",
      value: "1.5% of outstanding amount",
    },
  ],
  grievance: {
    title: "Grievance Redressal Officer",
    name: "Smt. Roshani Dinesh Kadam Patil",
    role: "(Deputy Secretary)",
    phone: "022-22023901",
    email: "roshni.patil@nic.in",
  },
};

/* Deposit account — 6031:16323 (default) & 6031:16010 (pre-filled) */
export const deposit = {
  title: "Setup Deposit Account",
  sub: "Please setup your deposit account & mandate",
  ifsc: "UTIB0000009",
  branch:
    "Axis Bank - Bangalore Address: No. 9 M.G. Road, Block ‘A’, Bangalore, K.A. - 560001",
  mandateLabel: "Select mode of mandate",
  modes: ["Net Banking", "Debit Card"],
};

/* E-Nach — 6031:16075 */
export const enach = {
  poweredBy: "Powered by Digio",
  createMandate: "CREATE Mandate",
  authLine:
    "I hereby authorise Digiotech Solutions Private Limited to debit my Bank Account, as per the below mentioned mandate and bank account details",
  chargesLine:
    "I understand that the bank where I have authorised the debit may levy mandate processing charges as mentioned in the bank’s latest schedule of charges.",
  mandateTitle: "Mandate Details",
  mandate: [
    { label: "Maximum Amount (in ₹)", value: "10.0" },
    { label: "Debit Frequency", value: "Monthly" },
    { label: "Purpose", value: "Others" },
    { label: "Start Date (dd-mm-yyyy)", value: "13-03-2000" },
    { label: "End Date (dd-mm-yyyy)", value: "13-03-2022" },
    { label: "Utility Code", value: "NACH000000000797191" },
  ],
  customerTitle: "Customer Details",
  customer: [
    { label: "Bank Name", value: "HDFC Bank Ltd", chevron: true },
    { label: "Debit Frequency", value: "568797017777122" },
    { label: "Purpose", value: "Savings", chevron: true },
    { label: "Start Date (dd-mm-yyyy)", value: "Vikas Kumar" },
  ],
  confirmLine:
    "This is to confirm that the decision has been carefully read, understood by me. I understand that I am authorised to cancel/amend this mandate by appropriately communicating the cancellation/amendment to Digiotech Solutions Private Limited.",
  redirect: "Please Wait white you are being redirected...",
};

/* Terms — 6031:16173 */
export const terms = {
  title: "Terms & Conditions",
  body:
    "Both parties represent convenants and warrant to each other that: (a) He/She has read all the terms and conditions, privacy policy, and other material available at the website pf Fairassets Technologies India Private Limited herein after referred to as faircent. (b) They unconditionally agree to abide by the terms and condition, privacy policy. (c) The information and financial details submitted by him/her on the website of Faircent. (d) They understand that Faircent only facilitates meeting of lender and borrowers and is not engaged or is responsible for either lending or ensuring the borrower shall repay the borrowed amout on the time. (e) They understand that Faircent only facilitates meeting of lender and borrowers and is not engaged or is responsible for either lending or ensuring the borrower shall repay the borrowed amout on the time. .",
};

/* Active Liveness — 6031:15828 */
export const liveness = {
  title: "Help us verify it’s you",
  sub: "We will be recording you for this, click on start and read the number out loud in 10 seconds",
  digits: "4-8-7-6",
  stopHint: "Please click on the stop button once you are done reading the numbers",
  confirmTitle: "Confirm Captured Video",
  confirmSub: "Please make sure the audio and video captured is clear to understand",
  locationPrompt: "Allow us to Access yur Location ?",
};

/* NSDL e-sign — 6031:16869 .. 6031:16992 */
export const nsdl = {
  timestamp: "2024-03-07 T 15:45:23",
  aadhaarLabel: "VID/Aadhaar:",
  aadhaar: "342578473789",
  otpLabel: "OTP",
  otp: "356284",
  sendOtp: "Send OTP",
  verifyOtp: "Verify OTP",
  success: "Successfully e-Signed!",
  goBack: "Go Back",
  copyright:
    "@2023 NSDL E-Governance Infrastructure Pvt. Ltd. All right reserved",
  warning:
    "Please don not press “Submit” button once again or the “Refresh” or “Back” buttons",
};

/* Terminal states — 6031:16697 & 6031:16641 */
export const outcome = {
  inProcess:
    "Thank you for choosing us. Your loan application 2345091211 is under process.",
  disbursed:
    "Congratulations! Your personal loan amount of Rs 2,00,000 is disbursed successfully",
  footnote:
    "Final Amount can very in case of pre EMI charges, please contact your RM for the details",
};

/* Loader captions, with the caption y-offset used in each frame */
export const loaders = {
  processingDots: { caption: "Processing...", top: 537 },
  processing: { caption: "Processing", top: 549 },
  bePatient: { caption: "Please be patient", top: 549 },
  verifying: { caption: "Verifying your details...", top: 549 },
  eMandate: { caption: "Redirecting you to e-Mandate", top: 549 },
  nsdl: { caption: "Connecting to NSDL for E-Signing", top: 604 },
  enachRedirect: { caption: "Processing...", top: 607 },
};

/* ============================================================
   Values below were transcribed from the exported PNGs, because
   these text layers are unnamed in the node metadata.

   PROVENANCE NOTE: the export supplied is of the sibling journey
   section (a ₹7,00,000 / 5L flow), not 6031:15453 itself. Labels,
   structure and formatting are identical between the two — same
   components — but amounts differ. Where I have a value from the
   6031:15453 nodes directly it wins; anything marked FROM-EXPORT
   below is the sibling section's figure and may need swapping.
   ============================================================ */

/* Details from Aadhaar & PAN — 6031:16558 / 16775 / 16815 */
export const details = {
  cardTitle: "Details from Aadhaar & PAN",
  fullNameLabel: "Full Name",
  fullName: "Vikas Kumar",
  dobLabel: "Date of Birth",
  dob: "23/03/1995",
  addressLabel: "Aadhaar Address",
  address:
    "Apt No. 410, Wallace Garden, 1st Street, Thousand Lights West, Nungambakkam, Chennai, Tamil Nadu – 600 008",
  toggle: "My Current Address is different from Aadhaar",
  form: [
    { label: "Address Line 1 *", value: "102 - A Block, Shipra Sun City" },
    { label: "Address Line 2 *", value: "Sector 22" },
    { label: "Pincode *", value: "201301" },
  ],
  city: { label: "City *", value: "Noida", empty: "--" },
  state: { label: "State *", value: "Uttar Pradesh", empty: "--" },
  cta: "Next",
  ctaAddress: "Save and Next",
};

/* Deposit Account — 6031:16323 (default) / 6031:16010 (filled) */
export const depositFields = {
  ifsc: { label: "IFSC Code*", labelFilled: "IFSC Code *", value: "UTIB0000009" },
  account: { label: "Account Number *", masked: 14 },
  confirm: {
    label: "Confirm Account Number *",
    value: "916010080379415",
  },
  branchName: "Axis Bank - Bangalore",
  branchAddress: "Address: No. 9 M.G. Road, Block ‘A’, Bangalore, K.A. - 560001",
  cta: "Submit",
};

/* Active Liveness — 6031:15828 */
export const livenessCopy = {
  locationTitle: "Allow us to Access yur Location ?",
  allow: "ALLOW",
  deny: "DENY",
  verifyTitle: "Help us verify it’s you",
  verifySubA: "We will be recording you for this, click on start and read the number out loud in ",
  verifySubHighlight: "10 seconds",
  start: "Start",
  digits: "4-8-7-6",
  stopHint: "Please click on the stop button once you are done reading the numbers",
  stop: "Stop",
  confirmTitle: "Confirm Captured Video",
  confirmSub: "Please make sure the audio and video captured is clear to understand",
  retake: "Retake",
  confirm: "Confirm",
  elapsed: "00:00",
  duration: "00:12",
  patient: "Please be patient",
};

/* E-Nach — 6031:16075. Chrome here is the 66px variant on cams.in/enach,
   with no Acme topbar. */
export const enachPage = {
  url: "cams.in/enach",
  poweredBy: "Powered by Digio",
  titleLead: "CREATE",
  titleRest: " Mandate",
  authA: "I hereby authorise ",
  authOrg: "Digiotech Solutions Private Limited",
  authB: " to debit my Bank Account, as per the below mentioned mandate and bank account details",
  charges:
    "I understand that the bank where I have authorised the debit may levy mandate processing charges as mentioned in the bank’s latest schedule of charges.",
  mandateHeader: "Mandate Details",
  customerHeader: "Customer Details",
  confirmA:
    "This is to confirm that the decision has been carefully read, understood by me. I understand that I am authorised to cancel/amend this mandate by appropriately communicating the cancellation/amendment to ",
  confirmOrg: "Digiotech Solutions Private Limited.",
  cancel: "Cancel",
  submit: "Submit",
};

/* NSDL e-sign — the page raster carries its own copy; these are the
   Figma text layers that sit outside it. */
export const nsdlChrome = {
  /* The VID/Aadhaar box and the Send OTP / Verify OTP pill are baked into
     the raster, so the demo overlays them. Rects are measured off the
     390x583 export, which sits at (20,154) 1:1 — see esign.jsx. */
  field: { left: 166, top: 608, width: 210, height: 30 },
  pill: { left: 55, top: 645, width: 74, height: 29 },
  otp: "356284" /* FROM-EXPORT */,
  copyright: "@2023 NSDL E-Governance Infrastructure Pvt. Ltd. All right reserved",
  warning:
    "Please don not press “Submit” button once again or the “Refresh” or “Back” buttons",
  success: "Successfully e-Signed!",
  goBack: "Go Back",
  pageBg: "#faf4e4",
};

/* Outcome screens — 6031:16697 (in process) / 6031:16641 (disbursed) */
export const outcomeTable = {
  statusLabel: "Status",
  inProgress: "In Progress",
  disbursedStatus: "Disbursed",
  amountLabel: "Disbursed Amount",
  amount: "₹4,96,500" /* FROM-EXPORT */,
  rows: [
    { label: "Lender", value: "Acme Bank Ltd" },
    { label: "Deposit Bank", value: "Axis Bank" },
    { label: "Deposit Account No.", value: "9211209837" },
    { label: "Due Date", value: "1 / 03 / 2024" },
    { label: "Loan Number", value: "ACM -123457890" },
  ],
  footnote:
    "Final amount can very in case of pre EMI charges, please contact your RM for the details",
};

/* SMS + notification — 6031:16613 / 6031:16753 */
export const sms = {
  sender: "VM - ACMEBANK",
  notifTitle: "VM-ACMEBANK",
  time: "now",
  body:
    "Congratulations! Your Loan of Rs. 4,96,500 has been approved and will be disbursed to your Deposit Account within next 24 hours.",
  signature: "- ACME BANK LTD",
  notifBody: "Congratulations! Your Loan of Rs. 4,96,500",
  placeholder: "Text Message",
  statusTime: "9:41",
};

/* Tooltip — a floating 326x72 overlay in the file */
export const tooltip = {
  body: "Enter the code provided by the bank sales manager who assisted you",
};
