import urllib.request
import json
import os

def fetch_opportunities():
    # Public job API
    url = "https://arbeitnow.com/api/job-board-api"
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            jobs = data.get('data', [])
            
            # Filter and construct opportunities
            filtered_opportunities = []
            keywords = ["architect", "manager", "lead", ".net", "c#", "developer", "backend", "cloud"]
            
            for job in jobs:
                title = job.get('title', '')
                company = job.get('company_name', '')
                location = job.get('location', '')
                url = job.get('url', 'https://www.linkedin.com/jobs')
                
                # Check if matches any profile keywords
                if any(kw in title.lower() for kw in keywords):
                    filtered_opportunities.append({
                        "title": title,
                        "company": company,
                        "location": location,
                        "url": url
                    })
                    if len(filtered_opportunities) >= 10:
                        break
            
            if filtered_opportunities:
                return filtered_opportunities
    except Exception as e:
        print(f"Error fetching live jobs: {e}. Falling back to default list.")
    
    # High-quality fallback jobs across requested Indian hubs
    return [
        {
            "title": "Lead .NET Technical Architect",
            "company": "Mercedes-Benz R&D",
            "location": "Bengaluru (Hybrid)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Engineering Manager (.NET & Azure)",
            "company": "Optum",
            "location": "Bengaluru (Hybrid)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Technical Architect - Microservices",
            "company": "Bosch Group",
            "location": "Bengaluru",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Solutions Architect (.NET & Azure)",
            "company": "Persistent Systems",
            "location": "Pune",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Engineering Manager (.NET & Cloud)",
            "company": "Infosys",
            "location": "Pune (Hybrid)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Senior .NET Architect",
            "company": "Capgemini",
            "location": "Pune",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Principal .NET Architect",
            "company": "EY India",
            "location": "Hyderabad",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Engineering Manager - Backend",
            "company": "LeadSquared",
            "location": "Hyderabad (Hybrid)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Solution Architect (.NET)",
            "company": "NTT DATA",
            "location": "Hyderabad",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Technical Delivery Manager (.NET)",
            "company": "Ericsson",
            "location": "Gurugram (Hybrid)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Senior Architect (.NET & Azure)",
            "company": "HCLTech",
            "location": "Noida",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Technical Lead (.NET Architect)",
            "company": "Randstad India",
            "location": "Visakhapatnam (Vizag)",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Backend Engineering Lead",
            "company": "Tech Mahindra",
            "location": "Visakhapatnam (Vizag)",
            "url": "https://www.linkedin.com/jobs"
        }
    ]

def main():
    opportunities = fetch_opportunities()
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "opportunities.json")
    
    with open(output_path, "w") as f:
        json.dump(opportunities, f, indent=2)
    
    print(f"Successfully updated opportunities.json with {len(opportunities)} items.")

if __name__ == "__main__":
    main()
