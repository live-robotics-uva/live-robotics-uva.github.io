# LIVE Robotics Lab Website

Welcome to the source code for the UVA Learning and Interactive Robotics (LIVE Robotics) Lab website! 

This website is built with plain HTML, CSS, and vanilla JavaScript and is designed to be easily extensible. All dynamic content is driven by lightweight JSON and BibTeX files in the `data/` folder, meaning you usually do not need to touch the HTML code to update the site's content.

## How to Test the Website Locally

Before committing changes to GitHub, it's a good idea to preview your changes locally to ensure everything works and looks correct.

You can start a simple local web server using Python (which is pre-installed on most Macs and Linux machines). 

1. Open a terminal and navigate to the root directory of this repository:
   ```bash
   cd path/to/live-robotics-uva.github.io
   ```
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your web browser and go to: `http://localhost:8000`

## How to Update Content

All content is managed inside the `data/` directory.

### 1. Home Page: Highlighted Projects (Hero Carousel)
The sliding carousel at the top of the Home page is controlled by `data/highlighted_projects.json`.

- **To add/remove a project**: Add or remove an object from the JSON array.
- **Fields**:
  - `"title"`: The text displayed over the image/video.
  - `"path"`: The path to the media file. Place your new images/videos inside the `assets/hero/` folder first. (e.g., `"./assets/hero/myvideo.mp4"`). Videos (`.mp4`, `.webm`) will auto-play, loop, and mute automatically.

### 2. Home Page: News
The news feed on the Home page is controlled by `data/news.json`.

- **To add a news item**: Add a new object to the top of the JSON array.
- **Fields**:
  - `"date"`: e.g., `"Dec 2025"`.
  - `"content"`: The news text. You can include straight HTML here (like `<a>` tags for links or `<b>` for bolding).

### 3. Team Page
Lab members are managed in `data/team.json`.

- The JSON file is split into arrays for `"pi"`, `"phd"`, `"masters"`, `"undergrad"`, and `"alumni"`.
- **To add/update a member**: Add or edit an object inside the appropriate array.
- **Fields**:
  - `"name"`: Required.
  - `"role"`: e.g., `"PhD Student"`. (Optional, defaults to section name).
  - `"email"`: Use `[at]` instead of `@` to prevent spam scraping. It will still function as a clickable email locally.
  - `"website"`: URL to a personal site or Google Scholar.
  - `"focus"`: A brief description of their research focus.
  - `"photo"`: The filename of their picture. Place the actual image inside `assets/images/team/` (e.g., `"JohnDoe.jpg"`). If no photo is provided, a generic placeholder will be used.
  - `"current"`: (For Alumni and Undergrads) e.g., `"UVA CS"` or `"Software Engineer at Google"`.

### 4. Research Page
Research projects are managed in `data/research.json`.

- **To add a project**: Add a new object to the JSON array.
- **Fields**:
  - `"title"`: The name of the project.
  - `"description"`: A short summary of the project.
  - `"link"`: The URL to the external project page.
  - `"image"`: The filename of the project image or video. Place these inside the `assets/hero/` folder (e.g., `"project1.jpg"`). Videos are supported and will autoplay.

### 5. Publications Page
Publications are managed via a standard BibTeX file: `data/publications.bib`.

- **To add a publication**: Open the `.bib` file and paste the new standard BibTeX entry at the top.
- **Special Fields**:
  - **Keywords/Filters**: The website automatically generates the clickable filter buttons at the top of the page based on your tags. Add a `keywords = {Tag1, Tag2}` field to your BibTeX entry. (Only tags with 2 or more papers will appear as top filters to prevent clutter).
  - **Paper URLs**: To add a link to the paper (e.g., arXiv), add a `url = {https://...}` field.
  - **Project Pages**: To add a link to the project site, add a custom `project = {https://...}` field. 

*(Note: The page uses a client-side Javascript parser to automatically format and sort these entries by year on the fly!)*