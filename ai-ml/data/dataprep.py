<<<<<<< HEAD
import csv
import random

# Extended base dataset with 300 Hinglish question-answer pairs
base_rows = [
    # Crop Cultivation
    ("Punjab me wheat ki beejai ka best time kya hai?", "Punjab me wheat ki beejai ka best time November ka pehla half hota hai."),
    ("Basmati rice ki kheti ke liye best season kaunsa hai?", "Basmati rice ki kheti June-July me shuru hoti hai."),
    ("Ganna ki kheti ke liye sabse acchi variety kaunsi hai?", "Co-0238 aur Co-0118 best sugarcane varieties hain."),
    ("Soybean ke liye best irrigation method kya hai?", "Soybean ke liye drip irrigation best hota hai."),
    ("Tomato ki kheti ke liye best soil type kya hai?", "Loamy aur well-drained soil tomato farming ke liye best hai."),
    
    # Soil Health
    ("Soil fertility badhane ke liye best organic manure kaunsa hai?", "Vermicompost aur green manure soil fertility badhate hain."),
    ("Soil testing kaise kiya jata hai?", "Soil testing lab me sample dekar ya soil testing kit se khud test karein."),
    ("Mitti ka pH level balance karne ke liye kya karein?", "Lime ya sulphur ka istemal karke pH balance karein."),
    ("Sandy soil me paani retention kaise badhayein?", "Organic matter aur mulch ka istemal karein."),
    ("Acidic soil ke liye kaunsa fertilizer best hai?", "Dolomite lime acidic soil ke pH ko balance karta hai."),
    
    # Pest & Disease Management
    ("Rice field me stem borer ka control kaise karein?", "Neem oil spray aur pheromone traps use karke stem borer ko control kiya ja sakta hai."),
    ("Mustard me aphid kaise control karein?", "Neem oil aur ladybird beetle ka use karein."),
    ("Cotton me pink bollworm ka control kaise karein?", "BT cotton seeds ka use karein aur pheromone traps lagayein."),
    ("Aloo me late blight kaise control karein?", "Bordeaux mixture aur copper-based fungicide ka spray karein."),
    ("Chickpea me pod borer ka control kaise karein?", "Neem oil aur Bacillus thuringiensis ka spray karein."),
    
    # Irrigation & Water Management
    ("Drip irrigation ka use kahan zyada hota hai?", "Drip irrigation dry areas jaise Rajasthan aur Gujarat me zyada use hota hai."),
    ("Hydroponics aur traditional farming me kya difference hai?", "Hydroponics me bina soil ke paani aur nutrients se plants ugaye jate hain."),
    ("Rice farming me water requirement kitna hota hai?", "Ek hectare rice farming ke liye lagbhag 5000 liter paani lagta hai."),
    ("Rainwater harvesting kaise karein?", "Farm ponds aur check dams ka use karein."),
    ("Bajra ki kheti me paani ki kitni zaroorat hoti hai?", "Bajra low water requirement wala crop hai, isko kam paani me bhi uga sakte hain."),
    
    # Fertilizers & Nutrients
    ("Paddy farming ke liye best fertilizer kaunsa hai?", "DAP aur urea mix best hota hai."),
    ("Soybean me maximum yield ke liye kaunsa seed best hai?", "JS-335 aur NRC-37 best varieties hain."),
    ("Organic farming ke liye kaunsa fertilizer best hai?", "Compost, vermicompost aur farmyard manure best hain."),
    ("Neem cake ka upyog kis liye hota hai?", "Soil fertility badhane aur pest control ke liye use hota hai."),
    ("Foliar spray fertilizers ka use kyon karein?", "Foliar spray se nutrients direct leaves me absorb hote hain."),
    
    # Government Schemes
    ("PM Kisan Samman Nidhi Yojana ka paisa kab milta hai?", "PM Kisan ka paisa har 4 mahine me ek installment me milta hai."),
    ("Tractor ke liye government subsidy kaise milegi?", "State agriculture department ke online portal se apply karein."),
    ("Krishi input subsidy ke liye apply kaise karein?", "Local agriculture office ya PM-KISAN portal se apply karein."),
    ("PM Fasal Bima Yojana ka labh kaise uthayein?", "Fasal beejai ke 10 din ke andar policy purchase karein."),
    ("Organic farming ke liye sarkari subsidy kaise milegi?", "PKVY yojana ke under organic farming ke liye subsidy available hai."),
    
    # Climate Adaptation
    ("Climate change se farming par kya asar padta hai?", "Climate change se monsoon irregular ho sakta hai aur pest infestation badh sakta hai."),
    ("Drought-prone areas me kaunse crops best hain?", "Millets jaise bajra aur jowar best hain."),
    ("Agroforestry ka kya fayda hai?", "Agroforestry se soil erosion kam hota hai aur biodiversity badhti hai."),
    ("Zero tillage farming ka fayda kya hai?", "Soil erosion kam hota hai aur water retention badhta hai."),
    ("Climate smart agriculture ka matlab kya hai?", "Aise farming methods jo climate change se hone wale risks ko kam karein."),
    
    # Agricultural Technology
    ("Kheti me AI aur drone ka use kaise hota hai?", "AI se crop health analysis aur drone se pesticide spray hota hai."),
    ("Solar pump se paani kaise supply karein?", "Drip irrigation ya sprinkler irrigation ke saath solar pump use karein."),
    ("Polyhouse farming ka cost kitna hota hai?", "1 acre polyhouse farming ka cost ₹30-50 lakh hota hai."),
    ("Kisan drone ka use kahan hota hai?", "Pesticide spraying aur field monitoring ke liye use hota hai."),
    ("Smart irrigation system kaise kaam karta hai?", "Smart sensors soil moisture ko detect karte hain aur irrigation ko automate karte hain."),
    ("Punjab me wheat ki beejai ka best time kya hai?", "Punjab me wheat ki beejai ka best time November ka pehla half hota hai."),
    ("Soil fertility badhane ke liye best organic manure kaunsa hai?", "Vermicompost aur green manure soil fertility badhate hain."),
    ("Rice field me stem borer ka control kaise karein?", "Neem oil spray aur pheromone traps use karke stem borer ko control kiya ja sakta hai."),
    ("Drip irrigation ka use kahan zyada hota hai?", "Drip irrigation dry areas jaise Rajasthan aur Gujarat me zyada use hota hai."),
    ("PM Kisan Samman Nidhi Yojana ka paisa kab milta hai?", "PM Kisan ka paisa har 4 mahine me ek installment me milta hai."),
    ("Tomato me fungal disease kaise roke?", "Copper fungicide aur neem extract spray karna beneficial hota hai."),
    ("Kisan mandi me apni fasal ka behtar daam kaise milega?", "Mandi rate daily check karein aur local buyer se negotiate karein."),
    ("Hybrid seeds aur desi seeds me kya difference hai?", "Hybrid seeds zyada yield dete hain, par desi seeds zyada pest-resistant hote hain."),
    ("Ganna ki kheti ke liye sabse acchi variety kaunsi hai?", "Co-0238 aur Co-0118 best sugarcane varieties hain."),
    ("Mushroom farming me sabse jyada profit kaunse type me hota hai?", "Button aur Oyster mushroom ka market demand high hota hai."),
    ("Chickpeas ke beej treatment me kya use karein?", "Rhizobium aur Trichoderma se seed treatment karein."),
    ("Aloo me late blight kaise control karein?", "Bordeaux mixture aur copper-based fungicide ka spray karein."),
    ("Organic farming ke liye kaunsa fertilizer best hai?", "Compost, vermicompost aur farmyard manure best hain."),
    ("Gobhi me caterpillar se bachne ke liye kya karein?", "Neem oil aur Bt spray ka use karein."),
    ("Kisan drone ka use kahan hota hai?", "Pesticide spraying aur field monitoring ke liye use hota hai."),
    ("Solar pump se paani kaise supply karein?", "Drip irrigation ya sprinkler irrigation ke saath solar pump use karein."),
    ("Dhaniya ki fasal ko fungal infection se kaise bachayein?", "Sulphur-based fungicide ka spray karein."),
    ("Bajra ki kheti ke liye sabse accha time kaunsa hai?", "July-August best time hai bajra ki kheti ke liye."),
    ("Mustard ki fasal me aphid ka control kaise karein?", "Neem oil aur ladybird beetle ka use karein."),
    ("Mango orchard me fruit fly kaise control karein?", "Pheromone traps aur neem-based spray ka use karein."),
    ("Cotton farming ke liye drip irrigation best hai ya sprinkler?", "Drip irrigation cotton farming ke liye best hai."),
    ("Krishi input subsidy ke liye apply kaise karein?", "Local agriculture office ya PM-KISAN portal se apply karein."),
    ("PM Fasal Bima Yojana ka labh kaise uthayein?", "Fasal beejai ke 10 din ke andar policy purchase karein."),
    ("Himachal Pradesh me apple farming ke liye best soil kaunsi hai?", "Loamy soil apple farming ke liye best hai."),
    ("Hydroponics farming me paani ka consumption kitna hota hai?", "Hydroponics farming me 90% kam paani lagta hai."),
    ("Rajasthan me rainwater harvesting ke liye best technique kaunsi hai?", "Khadeen aur johad best techniques hain."),
    ("Tractor ke liye government subsidy kaise milegi?", "State agriculture department ke online portal se apply karein."),
    ("Drought-prone areas me kaunse crops best hain?", "Millets jaise bajra aur jowar best hain."),
    ("Aquaponics aur hydroponics me kya fark hai?", "Aquaponics me fish farming aur hydroponics dono mix hota hai."),
    ("Polyhouse farming ka cost kitna hota hai?", "1 acre polyhouse farming ka cost ₹30-50 lakh hota hai."),
    ("Paddy farming ke liye best fertilizer kaunsa hai?", "DAP aur urea mix best hota hai."),
    ("Soybean me maximum yield ke liye kaunsa seed best hai?", "JS-335 aur NRC-37 best varieties hain."),
    ("Gobhi me maximum production ke liye kya karein?", "Spacing maintain karein aur timely irrigation de."),
    ("Kheti me AI aur drone ka use kaise hota hai?", "AI se crop health analysis aur drone se pesticide spray hota hai."),
    ("Neem cake ka upyog kis liye hota hai?", "Soil fertility badhane aur pest control ke liye use hota hai."),
    ("Zero tillage farming ka fayda kya hai?", "Soil erosion kam hota hai aur water retention badhta hai."),

    ("What are the best wheat varieties for cultivation in North India?", "HD 2967 and PBW 343 are high-yield wheat varieties suitable for North India."),
    ("How to prevent lodging in rice fields?", "Maintaining proper nitrogen levels and spacing plants adequately helps prevent lodging in rice fields."),
    ("What is the best season for maize cultivation in Bihar?", "The Kharif season (June to September) is ideal for maize cultivation in Bihar."),
    ("Which pulses are best suited for dryland farming?", "Chickpea, pigeon pea, and moth bean are ideal for dryland farming."),
    ("How to increase sugarcane yield using intercropping?", "Planting sugarcane with legumes like cowpea enhances soil fertility and boosts yield."),
    ("How to improve soil fertility using organic methods?", "Adding compost, green manure, and practicing crop rotation improves soil fertility."),
    ("What is the ideal pH level for cotton farming?", "The ideal soil pH for cotton farming ranges between 6.0 and 7.5."),
    ("How to prevent soil erosion in hilly agricultural land?", "Contour plowing and terracing are effective methods to prevent soil erosion."),
    ("What are the benefits of vermicomposting?", "Vermicomposting enriches soil with essential nutrients and improves moisture retention."),
    ("Which cover crops improve soil structure the most?", "Leguminous cover crops such as clover and alfalfa enhance soil structure."),
    ("What is the best irrigation method for small farms?", "Drip irrigation is highly efficient for small farms and conserves water."),
    ("How does drip irrigation help in water conservation?", "Drip irrigation reduces evaporation and delivers water directly to roots."),
    ("How to prevent waterlogging in paddy fields?", "Proper field leveling and drainage channels prevent waterlogging in paddy fields."),
    ("What is the best way to irrigate mango orchards?", "Micro-sprinkler irrigation is best for uniform watering in mango orchards."),
    ("How can farmers use rainwater harvesting for irrigation?", "Farmers can store rainwater in farm ponds and use it for irrigation during dry periods."),
    ("What is the recommended fertilizer dose for high-yield wheat?", "Using 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potassium per hectare boosts wheat yield."),
    ("How to make organic compost at home?", "Kitchen waste, cow dung, and dry leaves can be decomposed to make organic compost."),
    ("What is the impact of excessive nitrogen fertilizers on soil?", "Overuse of nitrogen fertilizers leads to soil acidity and nutrient imbalance."),
    ("Which biofertilizers are effective for soybean farming?", "Rhizobium and Azotobacter are beneficial biofertilizers for soybean crops."),
    ("What are the benefits of green manure in farming?", "Green manure improves soil fertility and reduces the need for chemical fertilizers."),
    ("What are the benefits of the PM Kisan Samman Nidhi scheme?", "Under PM Kisan, farmers receive ₹6,000 per year as direct financial support."),
    ("How to apply for subsidies on farm equipment in India?", "Farmers can apply for equipment subsidies through the PM Kisan Portal."),
    ("Which government schemes support organic farming?", "The Paramparagat Krishi Vikas Yojana (PKVY) promotes organic farming in India."),
    ("What is the eligibility for crop insurance in India?", "All registered farmers growing notified crops are eligible for PMFBY crop insurance."),
    ("How can farmers get loans under the Kisan Credit Card scheme?", "Farmers can apply at cooperative banks with land ownership proof and Aadhaar."),
    ("How to control aphids in mustard crops?", "Using neem oil spray and ladybugs as biological control helps manage aphids."),
    ("What are the symptoms of fungal infections in tomatoes?", "Wilting, yellow spots, and moldy growth indicate fungal infections in tomatoes."),
    ("Which biological pesticides are effective for fruit crops?", "Bacillus thuringiensis (Bt) and neem-based pesticides are effective for fruit crops."),
    ("How to manage whitefly infestations in cotton farming?", "Using yellow sticky traps and releasing predatory wasps help control whiteflies."),
    ("What are the best preventive measures for wheat rust?", "Planting rust-resistant wheat varieties and applying fungicides prevent wheat rust."),

]

# Total number of rows (expanding to 100,000)
total_rows = 500000
output_file = "agriculture_dataset_100k_hinglish.csv"

def generate_dataset(base_rows, total_rows, output_file):
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["query", "response"])
        for i in range(1, total_rows + 1):
            base_question, base_answer = random.choice(base_rows)
            unique_question = f"{base_question}"
            unique_answer = f"{base_answer}"
            writer.writerow([unique_question, unique_answer])
    print(f"Dataset saved as {output_file}")

generate_dataset(base_rows, total_rows, output_file)
=======
import pandas as pd
import re
from bs4 import BeautifulSoup

def clean_references(text):
    """
    Remove reference patterns [Ref #<number>] and (Detail ID: <number>).
    """
    if pd.isnull(text):
        return text
    # Remove [Ref #<number>]
    text = re.sub(r'\s*\[Ref #\d+\]', '', text)
    # Remove (Detail ID: <number>)
    text = re.sub(r'\s*\(Detail ID: \d+\)', '', text)
    return text

def remove_html_tags(text):
    """
    Remove HTML tags using BeautifulSoup.
    """
    if pd.isnull(text):
        return text
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text(separator=" ")

def lower_case(text):
    """
    Convert text to lowercase.
    """
    if pd.isnull(text):
        return text
    return text.lower()

def remove_special_characters(text):
    """
    Remove unwanted special characters except alphanumeric and whitespace.
    """
    if pd.isnull(text):
        return text
    # Remove any character that is not a word character (alphanumeric & underscore) or whitespace
    text = re.sub(r'[^\w\s]', '', text)
    return text

def remove_extra_whitespace(text):
    """
    Replace multiple whitespace characters with a single space and trim the text.
    """
    if pd.isnull(text):
        return text
    return re.sub(r'\s+', ' ', text).strip()

def clean_text(text):
    """
    Run all cleaning methods in sequence.
    """
    if pd.isnull(text):
        return text
    text = clean_references(text)
    text = remove_html_tags(text)
    text = lower_case(text)
    text = remove_special_characters(text)
    text = remove_extra_whitespace(text)
    return text

def clean_dataset(input_csv, output_csv, chunksize=10000):
    """
    Reads a large CSV file with 'query' and 'response' columns,
    applies text cleaning methods, removes duplicates, and writes the cleaned data to a new CSV.
    Bad lines are skipped.
    """
    first_chunk = True
    for chunk in pd.read_csv(input_csv, chunksize=chunksize, on_bad_lines='skip', engine='python'):
        # Clean text in both 'query' and 'response' columns
        chunk['query'] = chunk['query'].apply(clean_text)
        chunk['response'] = chunk['response'].apply(clean_text)
        
        # Remove duplicate rows based on query and response
        chunk = chunk.drop_duplicates(subset=['query', 'response'])
        
        # Write the cleaned chunk to the output CSV file
        if first_chunk:
            chunk.to_csv(output_csv, index=False, mode='w')
            first_chunk = False
        else:
            chunk.to_csv(output_csv, index=False, mode='a', header=False)
    
    print(f"Cleaned CSV saved as: {output_csv}")

# Example Usage:
input_csv = "D:/hackathon/agriculture-platform/ai-ml/data/questionsv4.csv"  # Ensure this path is correct
output_csv = "D:/hackathon/agriculture-platform/ai-ml/data/cleaned_dataset.csv"
clean_dataset(input_csv, output_csv, chunksize=10000)
>>>>>>> 518e557 (Initial commit)
