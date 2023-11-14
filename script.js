// Data for pages and languages
const pages = [
    {
        "name": "Bitcoin Bonus",
        "languages": [
            {"code": "en", "id": "bitcoin-bonus"},
            {"code": "de", "id": "bitcoin-bonus"},
            {"code": "es", "id": "bitcoin-bonus"},
            {"code": "fr", "id": "bitcoin-bonus"},
            {"code": "it", "id": "bitcoin-bonus"},
            {"code": "pt", "id": "bitcoin-bonus"},
            {"code": "ja", "id": "bitcoin-bonus"},
            // ... other languages
        ]
    },
    {
        "name": "Bitcoin Betting",
        "languages": [
            {"code": "en", "id": "bitcoin-betting"},
            {"code": "de", "id": "bitcoin-betting"},
            {"code": "es", "id": "bitcoin-betting"},
            {"code": "fr", "id": "bitcoin-betting"},
            {"code": "it", "id": "bitcoin-betting"},
            {"code": "pt", "id": "bitcoin-betting"},
            {"code": "ja", "id": "bitcoin-betting"},
            {"code": "tr", "id": "bitcoin-betting"},
        ]
    },
    {
        "name": "Bitcoin Casino",
        "languages": [
            {"code": "en", "id": "bitcoin-casino"},
        ]
    },
    {
        "name": "General Referral",
        "languages": [
            {"code": "en", "id": "refer"},
            {"code": "de", "id": "refer"},
            {"code": "es", "id": "refer"},
            {"code": "fr", "id": "refer"},
            {"code": "it", "id": "refer"},
            {"code": "ja", "id": "refer"},
        ]
    },
    
];

// Default pages available to all partners
const defaultPages = ['Bitcoin Bonus', 'Bitcoin Betting', 'Bitcoin Casino', 'General Referral'];

// Special access pages for specific partners
const partnerPages = {
    '1234': ['Exclusive Page for 1234', 'Special Offer Page'],
    '5678': ['Exclusive Page for 5678', 'Special Discount Page']
};

// Partner to Affiliate ID mapping
const partnerToAffiliateIdMap = {
    '1234': 'i98327te6r3fdvyb',
    '5678': '236517891230'
    // ... more mappings as needed
};

// Get partner ID from URL
const urlParams = new URLSearchParams(window.location.search);
const partnerId = urlParams.get('partner');

// Mapping of page names to their preview image paths
const pagePreviews = {
    "Bitcoin Bonus": "images/bitcoin-bonus.png",
    "Bitcoin Betting": "images/bitcoin-betting.png",
    // ... other pages with their corresponding image file names ...
};

// Get references to elements
const pageSelector = document.getElementById("page-selector");
const languageSelector = document.getElementById("language-selector");
const generateBtn = document.getElementById("generate-btn");
const result = document.getElementById("result");
const affiliateIdInput = document.getElementById("personal-id");

// Set the affiliate ID based on partner parameter
if (partnerId && partnerToAffiliateIdMap[partnerId]) {
    affiliateIdInput.value = partnerToAffiliateIdMap[partnerId];
} else {
    affiliateIdInput.value = "Your Affiliate ID"; // Default value
}

// Populate the page selector with options based on partner ID
function populatePages() {
    const partnerSpecificPages = partnerPages[partnerId] || [];
    const accessiblePages = [...new Set([...defaultPages, ...partnerSpecificPages])];

    pageSelector.innerHTML = ''; // Clear existing options

    pages.forEach(page => {
        if (accessiblePages.includes(page.name)) {
            const option = document.createElement("option");
            option.value = page.name;
            option.text = page.name;
            pageSelector.appendChild(option);
        }
    });

    pageSelector.selectedIndex = 0;
    updateLanguageSelector();
}

// Function to update the language selector options and the preview image
function updateLanguageSelector() {
    languageSelector.innerHTML = '';
    const selectedPage = pages.find(page => page.name === pageSelector.value);
    
    for (let i = 0; i < selectedPage.languages.length; i++) {
        const option = document.createElement("option");
        option.value = selectedPage.languages[i].code;
        option.text = selectedPage.languages[i].code.toUpperCase();
        languageSelector.appendChild(option);
    }

    // Update the preview image
    previewImage.src = pagePreviews[selectedPage.name] || 'images/default-preview.png';
}

// Event listener for page selector change
pageSelector.addEventListener("change", updateLanguageSelector);


// Event listener for generate button click
generateBtn.addEventListener("click", function() {
    const personalId = affiliateIdInput.value;
    const aftmSource = document.getElementById("label1").value;
    const referrer = document.getElementById("label2").value;
    const selectedLanguageCode = languageSelector.value;

    const selectedPage = pages.find(page => page.name === pageSelector.value);
    const selectedLanguageId = selectedPage ? selectedPage.languages.find(lang => lang.code === selectedLanguageCode).id : '';

    let url = `https://www.cloudbet.com/${selectedLanguageCode}/landing/${selectedLanguageId}/?af_token=${personalId}`;
    if (aftmSource) {
        url += `&aftm_source=${encodeURIComponent(aftmSource)}`;
    }
    if (referrer) {
        url += `&referrer=${encodeURIComponent(referrer)}`;
    }

    result.innerText = url;
});

// Initialize the page options when the script loads
populatePages();

// Copy to Clipboard Function
function copyToClipboard() {
    // Existing copy to clipboard logic
}
