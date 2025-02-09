import pandas as pd
import random
from faker import Faker
import itertools

fake = Faker()

# ====================================================
# Enhanced Seed Data for Indian Agriculture (Bilingual)
# ====================================================

# Crops categorized by type
crops = {
    "Cereals": [
        "wheat (gehu)", "rice (chaaval)", "maize (makai)",
        "millets (bajra)", "barley (jau)", "oats (jola)", "sorghum (jowar)"
    ],
    "Pulses": [
        "chickpea (chana)", "pigeon pea (arhar)", "lentil (masoor)",
        "mung bean (moong)", "black gram (urad)", "kidney bean (rajma)"
    ],
    "Commercial": [
        "sugarcane (ganna)", "cotton (kapas)", "jute (pat)",
        "tobacco (tambaku)", "groundnut (moongfali)"
    ],
    "Horticulture": [
        "mango (aam)", "banana (kela)", "potato (alu)",
        "tomato (tamatar)", "apple (seb)", "grapes (angoor)",
        "guava (amrood)"
    ],
    "Spices": [
        "turmeric (haldi)", "chili (mirchi)", "cumin (jeera)",
        "coriander (dhaniya)", "fenugreek (methi)"
    ]
}

# Pests categorized by feeding habit or behavior
pests = {
    "Sap-Sucking": [
        "aphids (kaet)", "whitefly (safed makhi)",
        "mealybugs (chillar)", "spider mite (makdi keede)"
    ],
    "Boring": [
        "stem borer (tanva)", "fruit borer (phalva)",
        "pod borer (chilva)"
    ],
    "Chewing": [
        "locust (tiddi)", "armyworm (senapati kida)",
        "cutworm (kataua)"
    ],
    "Others": [
        "thrips (phoolkeeda)"
    ]
}

# Tools categorized by technology level
tools = {
    "Traditional": [
        "wooden plough (hal)", "sickle (daranti)",
        "bullock cart (bailgadi)"
    ],
    "Modern": [
        "rotavator", "laser land leveler", "combine harvester",
        "drip irrigation system", "GPS guided tractor", "automated sprayer"
    ],
    "Digital": [
        "soil moisture sensor", "agriculture drone",
        "AI-powered crop advisory app", "farm management software"
    ]
}

# Schemes categorized by administrative level
schemes = {
    "Central": [
        "PM-KISAN", "PMFBY", "Neem Coated Urea",
        "Paramparagat Krishi Vikas Yojana", "Pradhan Mantri Fasal Bima Yojana"
    ],
    "State": [
        "Rythu Bandhu (Telangana)", "Krushak Assistance (Odisha)",
        "Bhavantar Bhugtan (MP)", "Kisan Samman Nidhi (Uttar Pradesh)"
    ],
    "Local": [
        "City Agriculture Initiative", "Regional Organic Farming Scheme"
    ]
}

# Additional food items for general knowledge questions
food_items = [
    "apple", "fish", "banana", "mango", "chicken curry",
    "dal", "paneer", "biryani", "samosa", "idli", " dosa", "paratha"
]

# ====================================================
# Advanced Query Templates (including Hinglish & General Knowledge)
# ====================================================
query_strategies = {
    "Problem-Solving": [
        "How to control {pest} in {crop} during {season}?",
        "{crop} leaves showing {symptom}, what to do?"
    ],
    "Comparative Analysis": [
        "Which is better for {region}: {crop1} or {crop2}?",
        "{tool1} vs {tool2} for {operation}"
    ],
    "Temporal Queries": [
        "Best {practice} for {crop} in {month}?",
        "When to harvest {crop} planted in {season}?"
    ],
    "Economic Analysis": [
        "What is the profit margin for {crop} in {state}?",
        "How to calculate {scheme} subsidy for {land_size}?"
    ],
    "Climate Smart": [
        "Drought-resistant {crop} varieties for {region}?",
        "Flood management in {crop} fields"
    ],
    "Hinglish": [
        "Kaise control karein {pest} in {crop} during {season}?",
        "{crop} ki leaves par {symptom} dikh raha hai, kya karein?",
        "{tool1} ya {tool2} mein se kaunsa hai best for {operation}?",
        "{crop} ki kheti ke liye best {practice} kya hai {month} mein?"
    ],
    "General Knowledge": [
        "What is {food}?",
        "Tell me about {food}.",
        "Who is Dev and what can you say about {food}?",
        "Explain {food}."
    ]
}

# ====================================================
# Advanced Response Engine with Context-Aware Logic
# ====================================================


class AgricultureResponseEngine:
    def __init__(self):
        self.knowledge_base = {
            "organic_inputs": ["vermicompost", "jivamrit", "panchagavya", "bone meal"],
            "ipm_strategies": ["neem oil spray", "trap crops", "biocontrol agents", "insecticidal soap"],
            "govt_portals": ["msp.gov.in", "soilhealth.dac.gov.in", "pmkisan.gov.in"]
        }

    def generate_response(self, query_template, params):
        query_lower = query_template.lower()

        if "{food}" in query_template:
            return self._food_general_response(params)
        elif "control" in query_lower or "kaise control" in query_lower:
            return self._pest_management_response(params)
        elif "subsidy" in query_lower:
            return self._scheme_response(params)
        elif "profit" in query_lower or "calculate" in query_lower:
            return self._economic_response(params)
        else:
            return self._general_response(params)

    def _pest_management_response(self, params):
        return (
            f"To manage {params['pest']} in {params['crop']}, follow these strategies:\n"
            f"1. **Cultural Methods**: {random.choice(['Crop rotation', 'Trap crops', 'Intercropping'])} help disrupt pest life cycles.\n"
            f"2. **Biological Control**: Using natural predators like {random.choice(self.knowledge_base['ipm_strategies'])} can reduce pest populations.\n"
            f"3. **Chemical Approach**: If necessary, apply {params['chemical']} carefully, following recommended guidelines.\n"
            f"Regular monitoring during the {params['growth_stage']} stage is crucial to early pest detection."
        )

    def _scheme_response(self, params):
        return (
            f"The **{params['scheme']}** scheme provides subsidies to farmers. \n"
            f"To apply, ensure you have required documents like {params['documents']}. \n"
            f"For detailed eligibility and application procedures, visit {random.choice(self.knowledge_base['govt_portals'])}."
        )

    def _economic_response(self, params):
        profit_margin = random.randint(10, 50)
        return (
            f"The estimated profit margin for {params['crop']} in {params['state']} is around **{profit_margin}%**.\n"
            f"To enhance yield and profitability, consider adopting {random.choice(self.knowledge_base['organic_inputs'])} and modern farming techniques."
        )

    def _general_response(self, params):
        return (
            f"For optimal {params['crop']} cultivation, practicing **{params['practice']}** is recommended.\n"
            f"Additionally, closely monitoring the crop during the **{params['growth_stage']}** stage can significantly improve yield and quality."
        )

    def _food_general_response(self, params):
        food = params["food"].capitalize()
        return (
            f"Hello! I am Dev. \n"
            f"**{food}** is a well-known food in Indian cuisine, valued for its taste and nutritional benefits. \n"
            f"It is commonly used in various regional dishes and has significant cultural importance."
        )


# ====================================================
# Dataset Generation Logic using Advanced Methods
# ====================================================
class DatasetGenerator:
    def __init__(self, target_size=10000):
        self.target_size = target_size
        self.engine = AgricultureResponseEngine()
        self.memory = set()
    
    def _fill_template(self, template, params):
        # For comparative queries, add extra parameters:
        if "{crop1}" in template:
            params["crop1"] = random.choice(list(itertools.chain(*crops.values())))
        if "{crop2}" in template:
            params["crop2"] = random.choice(list(itertools.chain(*crops.values())))
        if "{tool1}" in template:
            params["tool1"] = random.choice(list(itertools.chain(*tools.values())))
        if "{tool2}" in template:
            params["tool2"] = random.choice(list(itertools.chain(*tools.values())))
        if "{operation}" in template:
            params["operation"] = random.choice(["ploughing", "harvesting", "irrigation"])
        if "{symptom}" in template:
            params["symptom"] = random.choice(["yellowing", "spots", "wilting"])
        if "{food}" in template:
            params["food"] = random.choice(food_items)
        return template.format(**params)
    
    def _generate_unique_pair(self):
        while True:
            crop_category = random.choice(list(crops.keys()))
            params = {
                "crop": random.choice(crops[crop_category]),
                "pest": random.choice(list(itertools.chain(*pests.values()))),
                "tool": random.choice(list(itertools.chain(*tools.values()))),
                "scheme": random.choice(list(itertools.chain(*schemes.values()))),
                "season": random.choice(["kharif", "rabi", "zaid"]),
                "growth_stage": random.choice(["vegetative", "flowering", "fruiting"]),
                "region": random.choice(["Indo-Gangetic Plain", "Deccan Plateau", "Coastal", "Himalayan"]),
                "state": random.choice([
                    "Uttar Pradesh (uttar pradesh)", "Punjab (punjab)", 
                    "Maharashtra (maharashtra)", "Karnataka (karnataka)", 
                    "West Bengal (paschim bengal)"
                ]),
                "land_size": f"{random.randint(1, 5)} acres",
                "chemical": random.choice(["Rogor 30% EC", "Chlorpyrifos", "Neem Oil"]),
                "practice": random.choice(["integrated pest management", "organic farming", "precision agriculture"]),
                "documents": "Aadhaar, land records",
                "month": random.choice([
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ])
            }
            
            query_template = random.choice(list(itertools.chain(*query_strategies.values())))
            query = self._fill_template(query_template, params)
            response = self.engine.generate_response(query_template, params)
            
            if (query, response) not in self.memory:
                self.memory.add((query, response))
                return {"Query": query, "Response": response}
    
    def generate_dataset(self):
        dataset = []
        while len(dataset) < self.target_size:
            pair = self._generate_unique_pair()
            dataset.append(pair)
        return pd.DataFrame(dataset)

# ====================================================
# Execution
# ====================================================
if __name__ == "__main__":
    generator = DatasetGenerator(target_size=10000)
    dataset = generator.generate_dataset()
    dataset.to_csv("advanced_agriculture_dataset.csv", index=False)
    print(f"Generated {len(dataset)} unique entries with advanced seed data, multi-strategy query patterns (including Hinglish and General Knowledge), and context-aware responses.")
