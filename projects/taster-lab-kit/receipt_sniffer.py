from core_engine import get_engine
import os

def main():
    # 1. Initialize the Engine Room
    engine = get_engine()
    
    # 2. Identify the raw material (Treats)
    receipts_dir = "receipts"
    files = [f for f in os.listdir(receipts_dir) if f.endswith(('.jpg', '.png', '.jpeg'))]
    
    if not files:
        print("[code:zero] No receipts found in /receipts. Drop some photos in there first.")
        return

    print(f"[code:zero] Batch processing {len(files)} receipts...")
    
    report_lines = ["# code:zero Financial Intelligence Report\n"]
    report_lines.append("| Vendor | Date | Total | Confidence |")
    report_lines.append("| :--- | :--- | :--- | :--- |")

    # 3. Glide through the data
    for file in files:
        path = os.path.join(receipts_dir, file)
        
        # This is where the magic happens
        raw_data = engine.sniff_receipt(path)
        
        # IN THE TASTER: 
        # The AI Agent will help the CEO write the logic below to 
        # actually parse raw_data into the table. 
        # For the template, we'll leave a placeholder.
        
        vendor = "PENDING AI ANALYSIS"
        date = "YYYY-MM-DD"
        total = "RM 0.00"
        
        # We simulate the extraction logic for the demo
        report_lines.append(f"| {file} | {date} | {total} | 🟢 |")

    # 4. Ship the Report
    with open("report.md", "w") as f:
        f.write("\n".join(report_lines))
    
    print("\n[code:zero] SUCCESS: Your financial report is ready in report.md")
    print("[code:zero] Note: The AI extracted raw data. Sign up for the 3-Day Academy to automate the logic.")

if __name__ == "__main__":
    main()
