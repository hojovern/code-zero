# How I Built an App in 3 Hours to Organize My Wife's 10,000 Photos

It started with a hard drive. specifically, a 2TB external drive sitting on my desk, affectionately known as "The Digital Abyss."

Inside were about 10,000 photos collected over 5 years. iPhone backups, DSLR shots, random screenshots, and downloaded memes. The filenames were a disaster: `IMG_001.JPG`, `Screenshot 2022-01...`, `DSC_0992.NEF`.

My wife wanted them organized. "Just put them in folders by year and event," she said.

Doing that manually would have taken me until 2030. I didn't want to upload them to Google Photos (privacy concerns + monthly subscription costs + slow upload speeds). I wanted something **local**, **fast**, and **smart**.

So, I opened my terminal, fired up an AI coding assistant, and said: *"Let's build an image organizer."*

Here is the story of how we built **Binky**, a local AI-powered photo curator, in a single coding session.

---

## The Tech Stack: Keeping it Local

To build a tool that runs on my Mac but thinks like a supercomputer, we needed a specific stack. We avoided all cloud APIs. No OpenAI API keys, no AWS bills. Everything had to run on the silicon in front of me.

*   **Language:** Python (The undisputed king of AI tinkering).
*   **Interface:** [Streamlit](https://streamlit.io/). It lets you turn Python scripts into web apps in minutes.
*   **The Brain (Vision):** `OpenAI CLIP` (via HuggingFace). This model can look at an image and understand "This is a dog" or "This is a receipt."
*   **The Brain (Captioning):** `Salesforce BLIP`. A model that writes descriptive captions like "a golden retriever running on the beach."
*   **The Glue:** `shutil` for moving files and `watchdog` for automation.

---

## Phase 1: The "It Just Crashed" Phase

We started with a simple script to scan folders. It immediately crashed.

```text
OSError: Cannot save file into a non-existent directory
```

We were trying to write a CSV file to a path that didn't exist. Typical start. We fixed the path handling using Python's `pathlib` (always use `pathlib`, folks, strings are brittle) and got the scanner working.

**First win:** We could scan a folder and see a CSV list of files. But it was dumb. It was just a list.

## Phase 2: Giving it Eyes (The AI Integration)

This is where it got cool. We plugged in the **CLIP model**.

We didn't train a model (that takes days). We used a pre-trained one. We gave the AI a list of 50 concepts: `["Beach", "Mountain", "Invoice", "Selfie", "Cat", "Party"...]`.

For every image, the AI assigned a probability.
*   `IMG_9921.JPG` -> 98% "Receipt".
*   `IMG_9922.JPG` -> 95% "Dog".

Suddenly, I could type "Show me the dogs," and the app knew which files they were, even though the filename was just random numbers.

## Phase 3: The "Ghost Hand" Bug (iPad Integration)

I realized I didn't want to sit at my desk to organize these photos. I wanted to sit on the couch with my iPad.

Since Streamlit runs as a web server (`localhost:8501`), I thought, "Great! I'll just open that URL on my iPad."

It loaded perfectly. I saw the interface. I tapped the **"📂 Browse"** button on my iPad.

**The Problem:** The folder picker window popped up... **on my Mac in the other room.**

I had used a native macOS command (`osascript`) to open the file dialog. It was a "Ghost Hand" situation. I was tapping the iPad, and my Mac screen was reacting, but I couldn't see it on the iPad.

**The Solution:** We built a "Remote Mode."
We wrote a custom **Web-Based File Navigator** from scratch. It listed folders as dropdowns and "Up/Home" buttons in the browser itself. Now, the iPad wasn't just a second screen; it was a remote control. I could navigate my Mac's hard drive from the couch without triggering native windows.

## Phase 4: Personality Pivot (Enter Binky)

Initially, the app was called "Simple Image Organizer." Boring.

The UI was cluttered. Too many checkboxes. "Enable AI," "Rename," "Sort by," "Hierarchy."

I told the AI: *"Make it simpler. Make it magic."*

We rebranded.
*   **The Mascot:** A Sugar Glider (nature's most organized hoarder?).
*   **The Name:** **Binky's Magic Image Organizer**.
*   **The Copywriting:**
    *   *Scan* became **"✨ Start Magic Glide"**.
    *   *Organize* became **"Tuck into Pouches"**.
    *   *Search* became **"Sniff out treats"**.

It sounds silly, but it changed how I used the app. It felt like a helper, not a script.

## Phase 5: The "Natural Language" Breakthrough

The final hurdle was the organizing logic. Dropdowns are limiting. I wanted to just *say* what I wanted.

We built a parser that accepts natural language:
*   *"Organize by Year"* -> Creates `2023/`, `2024/` folders.
*   *"Put the dogs in one folder and the cats in another"* -> Uses the AI to sort by subject.
*   *"Sort by Vibe"* -> (This was the craziest part). We taught it to interpret abstract concepts. It creates folders like "Happy," "Melancholy," and "Dark" based on the image aesthetics.

## The Final Boss: Streamlit State Management

Building the iPad "Remote Mode" was the hardest part. Streamlit is brilliant for simple dashboards, but once you start building complex, interactive tools (like a file browser that works on two screens at once), you hit the "State Wall."

We kept running into a terrifying error:
`StreamlitAPIException: st.session_state.input_source cannot be modified after the widget is instantiated.`

**The Problem:** I would tap "Home" on my iPad. The app would try to update the path text box. But Streamlit had already "drawn" the text box for that frame. It felt like trying to change your clothes while you're already walking down the street.

**The Solution:** We had to refactor the entire navigation logic to use **Callbacks**. Instead of updating the state inside the main script, we moved everything into `on_click` and `on_change` functions. This ensured the "thinking" happened *before* the "drawing," finally making the iPad remote completely stable and crash-proof.

## One More Thing: The "Access Denied" Hurdle

When I finally connected my external drive to the Mac, Binky said "Access Denied." 

It turned out macOS’s strict security was blocking our script from reaching the `/Volumes` folder. We had to go into **System Settings > Full Disk Access** and explicitly give the Terminal permission to "see" the outside world. Once that gate was open, Binky could glide through terabytes of data effortlessly.

## The Result

In about 4 hours of coding (assisted heavily by an AI agent), I had a fully functional, local Mac app.

*   **Input:** A messy folder of 10,000 images.
*   **Action:** Click "Magic Organize."
*   **Output:** A clean structure: `Nature / 2024 / Mountain / 2024-05-01_Yosemite.jpg`.

It renamed the files based on what was *in* them ("Sunset", "Receipt"), not just when they were taken. It even found duplicates—not just identical files, but "Visual Duplicates" (burst mode shots) that looked 99% the same.

## The Meta-Conclusion

The wildest part? I didn't write most of the boilerplate code. I acted as the Architect and the Product Manager. I spotted the bugs ("The search bar is too small," "The iPad picker is broken"), and the AI wrote the Python fixes.

And yes, even this blog post was drafted by the AI, responding to my request to "document how we solved this."

We are living in the future of software development. You don't just write code; you have a conversation with it until it works.

Now, if you'll excuse me, Binky has some snacking—I mean, sorting—to do.
